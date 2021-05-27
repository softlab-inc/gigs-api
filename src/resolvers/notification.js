
module.exports = {
  gig: async (parent, arg, { models }) => await models.gig.findOne({ where: { id: parent.id } }),
  
}