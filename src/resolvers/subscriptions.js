const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = {
  hasTested:()=> pubsub.asyncIterator(['TEST']),
}