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
    /**
       extract professionId from payload
      look up from profession table for employer with same profession
      if true notifed them of a gig else nothing is notified
       */
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onGigCreated'),async (payload, variables,{models} ) => {
        const gigService = new GigService(models);
        const { professionId } = payload.onGigCreated;
        const user = getUser(variables.token);
        const notified = await gigService.notifyJobSeeker({ professionId, employeeId:user.id });
        return notified;
        },
      ),
  },
  onJobSeekerSentMessage:  {
    /**
       extract employeeId from payload
      look up from profession table for employer with same profession
      if true notifed them of a gig else nothing is notified
       */
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onJobSeekerSentMessage'),async ({onJobSeekerSentMessage}, {token},{models} ) => {
        const gigService = new GigService(models);
        const { employeeId } = onJobSeekerSentMessage;
        const user = getUser(token);
        
        return true;
        },
      ),
  },
  onEmployerSentMessage: {
    /**
       extract employeeId from payload
      look up from profession table for employer with same profession
      if true notifed them of a gig else nothing is notified
       */
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onEmployerSentMessage'),async ({onEmployerSentMessage}, {token},{models} ) => {
        const gigService = new GigService(models);
        const { employerId } = onEmployerSentMessage;
        const user = getUser(token);

        return true;
        },
      ),
  },
   onAcceptGig: {
    
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onAcceptGig'),async ({onAcceptGig}, {token},{models} ) => {
        const { employerId } = onAcceptGig;
        const user = getUser(token);
        // return user.id == employerId;
      return true;
        },
      ),
  },

  }
  