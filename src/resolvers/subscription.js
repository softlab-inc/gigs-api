const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = {
  hasTested: {
    subscribe: () => {
       console.log("Some is testing the server ")
      return pubsub.asyncIterator(['TEST']);
    }
  },

  }
