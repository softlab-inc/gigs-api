const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = {
  hasTested: {
    subscribe: () => {
      console.log("Some is testing the server ");
      return pubsub.asyncIterator(['TEST']);
    }
  },
  onStatusChange: {
    subscribe: (parent,args,context) => {
     
      const { token } = args;
      
      console.log(token)

      return pubsub.asyncIterator(['onStatusChange']);
    }
  },

  }
