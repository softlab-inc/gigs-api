module.exports = {
chats:async ({employeeId,employerId},args, { models,user }) => {
  let chats =   await models.chat.findAll({ where: { employeeId, employerId }, order: [['createdAt', 'DESC']],limit: 1 })
  return chats.map(data => ({ _id: data.id, text: data.content, ...data.dataValues }));
}, 

};