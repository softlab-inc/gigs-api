// hasAccepted -> wasHired for job
module.exports = {
  hasAccepted: async ({ id }, args, { models }) => {
    return await models.accepted.findAll({
      where: { employerId: id, hasAccepted: 0 },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
  },

  unReadHasAccepted: async ({ id }, args, { models }) =>
    await models.accepted.findAll({ where: { employerId: id, isRead: 0 } }),

  recentHires: async (
    { id: employerId },
    args,
    { services: { EmployerService }, user }
  ) => {
    return await EmployerService.getRecentHires({ employerId, user });
  },
};
