module.exports = {
   hasAccepted: async ({id}, args, { models }) =>  await models.accepted.findAll({where:{employeeId:id}}),
};
