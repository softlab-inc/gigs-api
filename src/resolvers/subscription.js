

module.exports = {
  hasTested: {
    subscribe: (_,__,{pubsub}) => {
      return pubsub.asyncIterator(['TEST']);
    }
  },
  onStatusChange: {
    subscribe:  (_, __, {pubsub}) => {
      return pubsub.asyncIterator(['onStatusChange']);
    }
  },

  }
