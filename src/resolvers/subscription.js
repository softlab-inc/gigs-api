const { PubSub } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const JWT_SECRETE = require('../utils/tokens');

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
