const { EmployerService } = require("../services");

// hasAccepted -> wasHired for job
module.exports = {
  hasAccepted: async ({ id }, args, { models }) =>
    await models.accepted.findAll({
      where: { employerId: id, hasAccepted: 0 },
      order: [["createdAt", "DESC"]],
      limit: 20,
    }),
  unReadHasAccepted: async ({ id }, args, { models }) =>
    await models.accepted.findAll({ where: { employerId: id, isRead: 0 } }),
  recentHires: async ({ id: employerId }, args, { models, user }) => {
    const employerService = new EmployerService(models);
    return await employerService.getRecentHires({ employerId, user });
  },
};
