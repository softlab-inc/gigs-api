const { withFilter } = require('apollo-server-express');

module.exports = {
  onStatusChange: {
    subscribe: (_, __, { pubsub }) => {
      return pubsub.asyncIterator(['onStatusChange']);
    }
  },
  onGigCreated: {
    // subscribe: (_, { token }, { pubsub }) => {
    //   console.log({ token })
    //   console.log(withFilter)
    //   return pubsub.a syncIterator(['onGigCreated:']);
    // },

    subscribe:withFilter((_, __, { pubsub }) => pubsub.asyncIterator('onGigCreated'),(payload, variables) => {
      console.log({ payload, variables })
      
      //extract professionId from payload
      //look up from profession table for employer with same profession
      //if true notifed them of a gig else nothing is notified
         
      return (payload === variables);
      // return pubsub.asyncIterator(['onGigCreated']);
        },
      ),
    
  },

  }
