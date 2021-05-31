

module.exports = {
  createdBy: async ({employerId}, args, { models }) =>  await models.employer.findOne({ where: { employerId } }),
  assignedTo: async ({employeeId}, args, { models }) => await models.employeeGig.findAll({where: { employeeId}})
};
