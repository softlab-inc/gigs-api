
module.exports = {
  gig: async ({gigId }, args, { models }) => await models.gig.findOne({ where: { id: gigId },order: [['createdAt', 'DESC']] }),
}