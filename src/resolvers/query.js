const {
    AuthenticationError,
    ForbiddenError,
    PubSub
} = require('apollo-server-express');

const pubsub = new PubSub();

const { JobSeekerSerivce,EmployerService} = require('../services');

module.exports = {
  test: () => {
    return 'Test is running';
  },
   jobSeeker: async (parent, args, { models, user }) => {
  
     const jobSeekerService = new JobSeekerSerivce(models);

     return await jobSeekerService.jobSeeker({user})
     
  },
  professions: async (parent, args, { models }) => models.profession.findAll(),
  
  
}