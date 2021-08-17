const { JobSeekerSerivce, EmployerService } = require("../services");

module.exports = {
  jobSeeker: async (_, __, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.jobSeeker({ user });
  },
  professions: async (_, __, { models }) => await models.profession.findAll(),
  employer: async (_, __, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.employer({ user });
  },
  employerChats: async (_, { employeeId }, { models, user }) => {
    const employerService = new EmployerService(models);
    console.log({ employeeId, user });
    const chats = await employerService.getChats({ user, employeeId });
    console.log({ chats });
    return chats.map((data) => ({
      _id: data.id,
      text: data.content,
      ...data.dataValues
    }));
  },
  jobSeekerChats: async (_, { employerId }, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    const chats = await jobSeekerService.getChats({ user, employerId });
    return chats.map((data) => ({
      _id: data.id,
      text: data.content,
      ...data.dataValues
    }));
  },
  gig: async (_, __, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getCreatedGig({ user });
  },
  createdGigs: async (_, __, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getCreatedGigs({ user });
  },
  getGig: async (_, { id }, { models, user }) =>
    models.gig.findOne({ where: id }), // hasAccepted -> wasHired for job
  employerNotifications: async (_, __, { models, user }) =>
    await models.accepted.findAll({
      where: { employerId: user.id, hasAccepted: 0 },
      order: [["createdAt", "DESC"]],
      limit: 20
    }),
  jobSeekerNotifications: async (_, __, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getAllNotifications({ user });
  },
  recentHires: async (_, __, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getRecentHires({ user });
  },
  employerMessages: async (_, __, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getMessageSenders({ user });
  },
  jobSeekerMessages: async (_, __, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.getMessageSenders({ user });
  },
  pendingGigs: async (_, __, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    const result = await jobSeekerService.getPendingGigs({ employeeId: user.id });
    console.log({ result });
    return result;
  },
  getGetJobSeeker: async (_, { id }, { models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.jobSeeker({ user: { id } });
  }
};
