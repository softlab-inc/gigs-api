
module.exports = {
  user: async ({  from,fullName:name}, args, context) => {

    return {
      _id: from,
      name: name,
      avatar: null,
    };
  }
} 