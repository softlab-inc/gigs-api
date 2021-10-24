module.exports = {
  jobSeeker: async (_, __, { services: { JobSeekerService }, user }) => {
    return await JobSeekerService.jobSeeker({ user });
  },

  professions: async (_, __, { models }) => await models.profession.findAll(),
  employer: async (_, __, { services: { EmployerService }, user }) => {
    return await EmployerService.employer({ user });
  },

  employerChats: async (
    _,
    { employeeId },
    { services: { EmployerService }, user }
  ) => {
    console.log({ employeeId, user });
    const chats = await EmployerService.getChats({ user, employeeId });
    console.log({ chats });
    return chats.map((data) => ({
      _id: data.id,
      text: data.content,
      ...data.dataValues,
    }));
  },

  jobSeekerChats: async (
    _,
    { employerId },
    { services: { JobSeekerService }, user }
  ) => {
    const chats = await JobSeekerService.getChats({ user, employerId });
    return chats.map((data) => ({
      _id: data.id,
      text: data.content,
      ...data.dataValues,
    }));
  },

  gig: async (_, __, { services: { EmployerService }, user }) => {
    return await EmployerService.getCreatedGig({ user });
  },
  createdGigs: async (_, __, { services: { EmployerService }, user }) => {
    return await EmployerService.getCreatedGigs({ user });
  },
  // hasAccepted -> wasHired for job
  getGig: async (_, { id }, { models }) => models.gig.findOne({ where: id }),

  employerNotifications: async (_, __, { models, user }) =>
    await models.accepted.findAll({
      where: { employerId: user.id, hasAccepted: 0 },
      order: [["createdAt", "DESC"]],
      limit: 20,
    }),

  jobSeekerNotifications: async (
    _,
    __,
    { services: { JobSeekerService }, user }
  ) => {
    return await JobSeekerService.getAllNotifications({ user });
  },

  recentHires: async (_, __, { services: { EmployerService }, user }) => {
    return await EmployerService.getRecentHires({ user });
  },

  employerMessages: async (_, __, { services: { EmployerService }, user }) => {
    return await EmployerService.getMessageSenders({ user });
  },
  businesses: async (_, __, { services: { EmployerService } }) => {
    return await EmployerService.getEmployers();
  },

  jobSeekerMessages: async (
    _,
    __,
    { services: { JobSeekerService }, user }
  ) => {
    return await JobSeekerService.getMessageSenders({ user });
  },

  pendingGigs: async (_, __, { services: { JobSeekerService }, user }) => {
    const result = await JobSeekerService.getPendingGigs({
      employeeId: user.id,
    });
    console.log({ result });
    return result;
  },

  getGetJobSeeker: async (_, { id }, { services: { JobSeekerService } }) => {
    return await JobSeekerService.JobSeeker({ user: { id } });
  },
};
