const { JobSeekerSerivce,EmployerService} = require('../services');

module.exports = {
   jobSeeker: async (parent, args, { models, user }) => {
     const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.jobSeeker({ user });
  },
  professions: async (parent, args, { models }) => await models.profession.findAll(),
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
  getGig: async (parent,{id}, { models,user}) => models.gig.findOne({where:id}) ,                                            //hasAccepted -> wasHired for job 
  employerNotifications:async(parent,args, { models, user }) => await models.accepted.findAll({ where: { employerId: user.id,hasAccepted:0 },order: [['createdAt', 'DESC']],limit: 20,}),
  jobSeekerNotifications:async(parent,args, { models,user}) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getAllNotifications({ user });
  },
  recentHires: async (parent,args, { models, user }) => {
     const employerService = new EmployerService(models);
     return await employerService.getRecentHires({user})
  },
  employerMessages: async (parent,args, { models, user }) => {
     const employerService = new EmployerService(models);
     return await employerService.getMessageSenders({user})
  },
  jobSeekerMessages: async (parent, args, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getMessageSenders({ user });
  },
  pendingGigs: async (parent, args, { models,user}) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getPendingGigs({ employeeId: user.id});
  }  

}