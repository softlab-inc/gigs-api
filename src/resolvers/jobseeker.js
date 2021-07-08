const {JobSeekerSerivce} = require('../services/')

module.exports = {
  hasProfession: async (parent, args, { models }) => {
  const jobSeekerService = new JobSeekerSerivce(models);
  return  await jobSeekerService.getProfessions({ employeeId: parent.id });
  },
  hasNotifications: async (parent, args, { models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getNotifications({ employeeId: parent.id });
  },
  unReadNotifications: async (parent, args, { models,user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getUnReadNotifications({ employeeId: user.id })
  },
  readNotifications: async (parent, args, { models }) => {
      const jobSeekerService = new JobSeekerSerivce(models);
      return await jobSeekerService.getReadNotifications({employeeId: user.id })
  },
  pendingGigs: async (parent, args, { models,user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getPendingGigs({ employeeId: user.id });
  }  
}
