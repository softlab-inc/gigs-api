
module.exports = {
  gig: async (parent, arg, { models }) => models.gig.findOne({ where: { id: parent.id } }),
}