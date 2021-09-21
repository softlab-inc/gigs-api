module.exports = {
  hasProfession: async ({ id }, args, { services: { JobSeekerService } }) => {
    return await JobSeekerService.getProfessions({ employeeId: id });
  },
  hasNotifications: async (
    { id },
    args,
    { services: { JobSeekerService } }
  ) => {
    return await JobSeekerService.getNotifications({ employeeId: id });
  },
  unReadNotifications: async (
    { id },
    args,
    { services: { JobSeekerService } }
  ) => {
    return await JobSeekerService.getUnReadNotifications({ employeeId: id });
  },
  readNotifications: async (
    { id },
    args,
    { services: { JobSeekerService } }
  ) => {
    return await JobSeekerService.getReadNotifications({ employeeId: id });
  },
  pendingGigs: async ({ id }, args, { services: { JobSeekerService } }) => {
    return await JobSeekerService.getPendingGigs({ employeeId: id });
  },
  recentEmployers: async ({ id }, args, { services: { JobSeekerService } }) => {
    return await JobSeekerService.getRecentEmployers({ employeeId: id });
  },
};
