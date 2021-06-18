

module.exports = {
  createdBy: async ({ employerId }, args, { models }) => await models.employer.findOne({ where: { id: employerId } }),
  profession: async ({professionId},args,{ models}) => await models.profession.findOne({ where: {id:professionId}}),
  assignedTo: async ({ id }, args, { models }) => {
  let data = await models.employeeGig.findAll({ where: { gigId: id }, include: [models.employee] });
  return data.map(data => ({...data.get('employee').dataValues,status:data.status}));//update employee onLine status with gig progress status
  }
};
