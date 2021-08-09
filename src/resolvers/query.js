const { JobSeekerSerivce,EmployerService} = require('../services');

module.exports = {
   jobSeeker: async (_, args, { models, user }) => {
     const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.jobSeeker({ user });
  },
  professions: async (_, args, { models }) => await models.profession.findAll(),
  employer: async (_, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.employer({ user });
  },
  employerChats: async (_, {employeeId}, { models,user }) => {
    const employerService = new EmployerService(models);
    let chats = await employerService.getChats({ user, employeeId });
    return chats.map(data => ({ _id: data.id, text: data.content, ...data.dataValues }));
  },
  jobSeekerChats: async (_, { employerId }, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    let chats = await jobSeekerService.getChats({ user, employerId });
    return chats.map(data => ({ _id: data.id, text: data.content, ...data.dataValues }));
  },
  gig: async (_, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getCreatedGig({ user });
  },
  createdGigs: async (_, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getCreatedGigs({ user });
  },
  getGig: async (_,{id}, { models,user}) => models.gig.findOne({where:id}) ,                                            //hasAccepted -> wasHired for job 
  employerNotifications:async(_,args, { models, user }) => await models.accepted.findAll({ where: { employerId: user.id,hasAccepted:0 },order: [['createdAt', 'DESC']],limit: 20,}),
  jobSeekerNotifications:async(_,args, { models,user}) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getAllNotifications({ user });
  },
  recentHires: async (_,args, { models, user }) => {
     const employerService = new EmployerService(models);
     return await employerService.getRecentHires({user})
  },
  employerMessages: async (_,args, { models, user }) => {
     const employerService = new EmployerService(models);
     return await employerService.getMessageSenders({user})
  },
  jobSeekerMessages: async (_, args, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getMessageSenders({ user });
  },
  pendingGigs: async (_, args, { models,user}) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    let result =  await jobSeekerService.getPendingGigs({ employeeId: user.id});
    console.log({result})
    return result;
  },
  getGetJobSeeker: async (_, {id}, { models}) => {
        const jobSeekerService = new JobSeekerSerivce(models);
        return await jobSeekerService.jobSeeker({ user:{id }});
  },

}