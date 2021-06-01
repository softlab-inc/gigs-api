

module.exports = {
  createdBy: async ({ employerId }, args, { models }) => await models.employer.findOne({ where: { id: employerId } }),
  profession: async ({professionId},args,{ models}) => await models.profession.findOne({ where: {id:professionId}}),
  // assignedTo: async ({employeeId}, args, { models }) => await models.employeeGig.findAll({where: { employeeId}})
};
