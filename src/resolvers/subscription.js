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
      
      const notified = await gigService.notifyJobSeekers({professionId, user} )

      console.log({notified})
      //extract professionId from payload
      //look up from profession table for employer with same profession
      //if true notifed them of a gig else nothing is notified
      
      return notified;
      // return pubsub.asyncIterator(['onGigCreated']);
        },
      ),
    
  },

  }
