
module.exports = {
  user: async ({  from,to,fullName:name,avatar}, args, {user:{id}}) => {
      return {
      _id: (name.length+from),
      name: name,
      avatar,
    };
  }
}  