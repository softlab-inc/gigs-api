const { PubSub } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const JWT_SECRETE = require('../utils/tokens');



module.exports = {
  hasTested: {
    subscribe: (parent,args,{pubsub}) => {
      console.log("Something is testing the server ");
      return pubsub.asyncIterator(['TEST']);
    }
  },
  onStatusChange: {
    subscribe:  (parent, args, {pubsub}) => {
      return pubsub.asyncIterator(['onStatusChange']);
    }
  },

  }
