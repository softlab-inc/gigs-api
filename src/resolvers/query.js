const { JobSeekerSerivce,EmployerService} = require('../services');

module.exports = {
   jobSeeker: async (parent, args, { models, user }) => {
  
     const jobSeekerService = new JobSeekerSerivce(models);

     return await jobSeekerService.jobSeeker({user})
     
  },
  professions: async (parent, args, { models }) => models.profession.findAll(),
  
  employer: async (parent, args, { models, user }) => {
    
    const employerService = new EmployerService(models);

    return await employerService.employer({user})
  }

}