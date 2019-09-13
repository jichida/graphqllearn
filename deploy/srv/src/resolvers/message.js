const {combineResolvers} =  require('graphql-resolvers');
const debug = require('debug')('srv:resolver');
const pubsub = require('../subscription');
const { isAuthenticated, isMessageOwner } = require('./authorization');

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

  module.exports = {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor),
            },
          }
        : {};
        debug(cursorOptions);
      const messages = await models.Message.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );
      debug(`cursor:${cursor}`)
      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;
   
      debug(`edges:${edges.length},limit:${limit},messages.length:${messages.length},hasNextPage:${hasNextPage}`);

      const endCursor  = toCursorHash(
        edges[edges.length - 1].createdAt.toString(),
      );

      debug(`endCursor:${endCursor}`)
       return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor
        }
      };
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish("CREATED", {
          messageCreated: { message },
        });

        return message;
      },
    ),

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        const message = await models.Message.findById(id);

        if (message) {
          await message.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  Message: {
    user: async (message, args, { loaders }) => {
      return await loaders.user.load(message.userId);
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator("CREATED"),
    },
  },
};