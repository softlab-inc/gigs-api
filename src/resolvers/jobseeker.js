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
  unReadNotifications: async (parent, args, { models, }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getUnReadNotifications({ employeeId: parent.id })
  },
  readNotifications: async (parent, args, { models }) => {
      const jobSeekerService = new JobSeekerSerivce(models);
      return await jobSeekerService.getReadNotifications({employeeId: parent.id })
  },
  pendingGigs: async (parent, args, { models }) => {
  let data = await models.employeeGig.findAll({ where: { employeeId: 3 },include:[models.gig] ,});
  return  data.map(data => ({ ...data.get('gig'), status: data.status }));
  } 
}
