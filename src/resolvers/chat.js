
module.exports = {
  // jobSeeker: async ({employeeId}, args, { models }) =>await models.employee.findOne({where:{id:employeeId}}),
  // employer: async ({ employerId }, args, { models }) => await models.employer.findOne({ where: { id: employerId } }),
  user: async ({ employeeId, employerId, from, to }, args, { models, user: { id } }) => {
    console.log({ employeeId, employerId, from, to });
    console.log({ user: { id } });

    // let employer = await models.employer.findOne({ where: { id: employerId } });

    // let jobSeeker = await models.employer.findOne({ where: { id: employerId } });

    return {
      _id: to,
      name: 'raymond',
      avatar: null,
    };
  }
}