const { ApolloServer, gql } =  require("apollo-server-express");
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const express =  require("express");
const mongoose =  require( "mongoose");
const cors = require('cors');
const config = require('./src/config');
const debug = require('debug')('srv:start');
const winston = require('./src/log/log.js');
const schema = require('./src/schema');
const resolvers = require('./src/resolvers');
const models = require('./src/models');
const DataLoader =  require('dataloader');
const loaders = require('./src/loaders');
const http = require('http');

winston.initLog();

const uri = config.get('app:MONGO_URL');
const tokensecret = config.get('app:tokensecret');

debug(`==程序启动${config.get('app:version')},uris:${uri},tokensecret:${tokensecret}`);
winston.getlog().info(`==程序启动${config.get('app:version')}`);

const getMe = async req => {
  const token = req.headers['x-token'];
  if (!!token) {
    try {
      return await jwt.verify(token,tokensecret);
    } catch (e) {
      debug(e);
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const startServer = async () => {
  debug(`start connect mongodb`);
  await mongoose.connect(uri, {
    useNewUrlParser: true,useFindAndModify: false  });

    
  const app = express();
  app.use(cors());
  const server = new ApolloServer({
    typeDefs:schema,
    resolvers,
    formatError: error => {
      console.error(error);
      debug(error);
      // remove the internal sequelize error message
      // leave only the important validation error
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');
  
      return {
        ...error,
        message,
      };
    },
    context: async ({ req, connection }) => {
      if (connection) {
        return {
          models,
          loaders: {
            user: new DataLoader(keys =>
              loaders.batchUsers(keys, models),
            )
          },
        };
      }
  
      if (req) {
        const me = await getMe(req);
  
        return {
          models,
          me,
          secret:tokensecret,
          loaders: {
            user: new DataLoader(keys =>
              loaders.batchUsers(keys, models),
            )
          },
        };
      }
    },
  });

  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);


  // await createUsersWithMessages();//for test

  debug(`start server:${config.get('app:listenport')}`);

  httpServer.listen({ port:config.get('app:listenport')}, ()=>{
      ////console.log('listening on *:' + config.listenport);
      winston.getlog().info(`start server:${config.get('app:listenport')},http://localhost:4000${server.graphqlPath}`);
    });

 
};

const createUsersWithMessages = async date => {
  const user1 = new models.User({
    username: 'rwieruch',
    email: 'hello@robin.com',
    password: 'rwieruch',
    role: 'ADMIN',
  });

  const user2 = new models.User({
    username: 'ddavids',
    email: 'hello@david.com',
    password: 'ddavids',
  });

  const message1 = new models.Message({
    text: 'Published the Road to learn React',
    // createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user1.id,
  });

  const message2 = new models.Message({
    text: 'Happy to release ...',
    // createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user2.id,
  });

  const message3 = new models.Message({
    text: 'Published a complete ...',
    // createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user2.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};

try{
  startServer();
}
catch(e){
  debug(`get error--->`);
  debug(e);
}