
module.exports = {
  user: async ({  from,to,fullName:name,avatar}, args, {user:{id}}) => {
    console.log({ from,to,fullName:name,avatar})
    console.log({ from,to, name,id });
     
    if (to == from) {
      return {
      _id: (name.length+from),
      name: name,
      avatar,
    };
    } else {
       return {
      _id: from,
      name: name,
      avatar,
    };
    }

  }
}  