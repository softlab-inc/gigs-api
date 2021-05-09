const { withFilter } = require('apollo-server-express');
const getUser = require('../utils/getUser');
const {GigService} = require('../services/')

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

    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onGigCreated'),async (payload, variables,{models} ) => {
      const gigService = new GigService(models);
      const { professionId } = payload.onGigCreated;
      const user = getUser(variables.token);
     
      console.log(user)
      //extract professionId from payload
      //look up from profession table for employer with same profession
      //if true notifed them of a gig else nothing is notified
      
      return (payload === variables);
      // return pubsub.asyncIterator(['onGigCreated']);
        },
      ),
    
  },

  }
