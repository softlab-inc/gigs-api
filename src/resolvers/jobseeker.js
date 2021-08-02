const {JobSeekerSerivce} = require('../services/')

module.exports = {
  hasProfession: async ({id}, args, { models }) => {
  const jobSeekerService = new JobSeekerSerivce(models);
  return  await jobSeekerService.getProfessions({ employeeId:id });
  },
  hasNotifications: async ({id}, args, { models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getNotifications({ employeeId: id });
  },
  unReadNotifications: async ({id}, args, { models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getUnReadNotifications({ employeeId: id })
  },
  readNotifications: async ({id}, args, { models}) => {
      const jobSeekerService = new JobSeekerSerivce(models);
      return await jobSeekerService.getReadNotifications({employeeId: id })
  },
  pendingGigs: async ({id}, args, { models}) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getPendingGigs({ employeeId: id}); 
  },
  recentEmployees: async ({id}, args, { models}) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getPendingGigs({ employeeId: id}); 
  } 
}
