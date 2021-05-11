
module.exports = {

  gig: async (parent, arg, { models }) => {
    return models.gig.findOne({ where: { id: parent.id } });
  }

}