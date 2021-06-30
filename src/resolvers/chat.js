
module.exports = {
  user: async ({  from,to,fullName:name}, args, {user:{id}}) => {
  
    console.log({ from,to, name,id });
     
    if (to == from) {
      return {
      _id: (name.length+from),
      name: name,
      avatar: null,
    };
    } else {
       return {
      _id: from,
      name: name,
      avatar: null,
    };
    }

  }
}  