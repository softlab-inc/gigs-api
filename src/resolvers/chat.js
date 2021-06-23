
module.exports = {
  user: async ({  from,fullName:name}, args, {user}) => {
  
    return {
      _id: (name.length+from),
      name: name,
      avatar: null,
    };
  }
}  