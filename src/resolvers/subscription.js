const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = {
  hasTested: {
    subscribe: () => pubsub.asyncIterator(['TEST'])
  },

  }
