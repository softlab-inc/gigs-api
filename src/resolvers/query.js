const { JobSeekerSerivce,EmployerService} = require('../services');

module.exports = {
   jobSeeker: async (parent, args, { models, user }) => {
     const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.jobSeeker({ user });
  },
  professions: async (parent, args, { models }) =>await models.profession.findAll(),
  employer: async (parent, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.employer({ user });
  },
  employerChats: async (parent, {employeeId}, { models,user }) => {
    const employerService = new EmployerService(models);
    let chats = await employerService.getChats({ user, employeeId });
    return chats.map(data => ({ _id: data.id, text: data.content, ...data.dataValues }));
  },
  jobSeekerChats: async (parent, { employerId }, { models, user }) => {
     console.log(JobSeekerSerivce)
    const jobSeekerService = new JobSeekerSerivce(models);
    let chats = await jobSeekerService.getChats({ user, employerId });
    return chats.map(data => ({ _id: data.id, text: data.content, ...data.dataValues }));
  },
  gig: async (parent, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getCreatedGig({ user });
  },
  createdGigs: async (parent, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getCreatedGigs({ user });
  },
  getGig: async (parent,{id}, { models }) => models.gig.findOne({where:id}) ,
   employerNotifications:async(parent,args, { models, user }) => {
      
  },
  jobSeekerNotifications:async(parent,args, { models}) => {
  
  }
  
  // notifications: async (parent, args, { models, user }) => {
  //   const jobSeekerService = new JobSeekerSerivce(models);
  //   return await jobSeekerService.getAllNotifications({ user });
  // },
  // readNotifications: async (parent, args, { models,user }) => {
  //   const jobSeekerService = new JobSeekerSerivce(models);
  //   return await jobSeekerService.getReadNotifications({user})
  // },
  // unReadNotifications: async (parent, args, { models,user }) => {
  //   const jobSeekerService = new JobSeekerSerivce(models);
  //   return await jobSeekerService.getUnReadNotifications({user})
  // }

}