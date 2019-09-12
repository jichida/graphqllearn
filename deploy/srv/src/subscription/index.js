const { PubSub } = require('apollo-server');
const MESSAGE_EVENTS = require('./message');

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
};

export default new PubSub();