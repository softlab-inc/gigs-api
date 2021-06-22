
module.exports = {
  // jobSeeker: async ({employeeId}, args, { models }) =>await models.employee.findOne({where:{id:employeeId}}),
  // employer: async ({ employerId }, args, { models }) => await models.employer.findOne({ where: { id: employerId } }),
  user: async ({ employeeId, employerId, from, to }, args, { models,user:{id}}) => {
     
  }
}