const {JobSeekerSerivce} = require('../services/')

module.exports = {
  hasProfession: async (parent, args, { models }) => {
  const jobSeekerService = new JobSeekerSerivce(models);
  return  await jobSeekerService.getProfessions({ employeeId: parent.id });
  },
  hasNotifications: async (parent, args, { models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getNotifications({ employeeId: parent.id });
  }
}
