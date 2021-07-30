module.exports = {
chats:async ({employeeId,employerId},args, { models,user }) => await models.chat.findAll({ where: { employeeId, employerId }, order: [['createdAt', 'DESC']],limit: 40 }),

};