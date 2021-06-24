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
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onGigCreated'),async ({onGigCreated}, {token},{models} ) => {
        const gigService = new GigService(models);
        const { professionId } = onGigCreated;
        const user = getUser(token);
        const notified = await gigService.notifyJobSeeker({ professionId, employeeId:user.id });
        return notified;
        },
      ),
  },
  onJobSeekerSentMessage:  {
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onJobSeekerSentMessage'),async ({onJobSeekerSentMessage}, {token},{models} ) => {
        const { employerId } = onJobSeekerSentMessage;
        const {id}= getUser(token);
        return id ==employerId;
        },
      ),
  },
  onEmployerSentMessage: {
    /**
       extract employeeId from payload
      look up from profession table for employer with same profession
      if one found  (true) then notifed them of a gig else nothing is notified
       */
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onEmployerSentMessage'),async ({onEmployerSentMessage}, {token},{models} ) => {
        const { employeeId } = onEmployerSentMessage;
        const {id}= getUser(token);
        return employeeId == id;
        },
      ),
  },
   onAcceptGig: {
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onAcceptGig'),async ({onAcceptGig}, {token},{models} ) => {
        const { employerId } = onAcceptGig;
      const {id} = getUser(token);
        return id == employerId;
        },
      ),
  },
   onJobSeekerHired: {
    subscribe:withFilter((_, __, { pubsub}) => pubsub.asyncIterator('onJobSeekerHired'),async ({onJobSeekerHired}, {token},{models} ) => {
        const { employeeId } = onJobSeekerHired;
        const {id} = getUser(token);
        return id == employeeId;
        },
      ),
  },
    onTestSubscription: {
      subscribe: withFilter((_, __, { pubsub }) => pubsub.asyncIterator('onTestSubscription'), async ({ onTestSubscription }, {token},{models} ) => {
        return onTestSubscription==token;
        },
      ),
  },

  } 
  