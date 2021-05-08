

module.exports = {
  onStatusChange: {
    subscribe:  (_, __, {pubsub}) => {
      return pubsub.asyncIterator(['onStatusChange']);
    }
  },

  }
