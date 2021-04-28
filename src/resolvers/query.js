const {
    AuthenticationError,
    ForbiddenError,
    PubSub
} = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = {
  test: () => {
   
    return 'Test is running';
  },
   jobSeeker: async (parent, args, { models, user }) => {

      if (!user) {
            throw new AuthenticationError('You should be signed!');
      }
     const {id} = user;
     return await models.employee.findOne({ id });
  },
  professions: async (parent,args,{models}) => models.profession.findAll(),
}