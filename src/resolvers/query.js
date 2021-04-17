const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');

module.exports = {
  test: () => 'testing if this is working just fine',
   jobSeeker: async (parent, args, { models, user }) => {

      if (!user) {
            throw new AuthenticationError('You should be signed in before getting your uoser account ');
      }
     
     const id = user.id;
     return await models.employee.findOne({ id });
  }
}