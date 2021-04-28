const bcrypt = require('bcrypt'); //password increption module
const jwt = require('jsonwebtoken'); //json web token module
const {AuthenticationError,ForbiddenError} = require('apollo-server-express');
const JWT_SECRETE = require('../utils/tokens');

const { JobSeekerSerivce } = require('../services');

module.exports = {
  test: (parent, { name }, {pubsub}) => {
    pubsub.publish('TEST', { hasTested: `my name is ${name}` });
    return 'Some has checked in ';
  },
  createJobSeeker:async (parent,{input},{models,pubsub}) => {

    try {
      const jobSeekerSerivce = new JobSeekerSerivce(models);

      const JobSeeker = await jobSeekerSerivce.createJobSeeker({ input });

         return jwt.sign({id: JobSeeker.id},JWT_SECRETE);
                                                      
    } catch (error) {
      console.log(error);
      throw new Error('Email address already used try again!');
    }

  },
  createProfession:async (parent,{input},{models}) => {
     
    //Mapping the list of names to {name:value}
    const  nameArr =   input.names.map(name => ({name}));

    try {
      await models.profession.bulkCreate(nameArr);
       return 'Professions created successfully'
    } catch (error) {
      throw new Error(`Duplicated professoin ${error}`);
    }
  
  },
  signInJobSeeker:async (parent,{input},{models}) => {
    
     let  {email,password} = input;

       email = email.trim().toLowerCase();

      let user = await models.employee.findOne({where:{email}});

       if(!user){
          throw new AuthenticationError('Error signing in');
       }

        //comparing the password with the hash stored in the database 
       let valid = await bcrypt.compare(password,user.password);

       if(!valid){
         throw new AuthenticationError('Error signing in')
       }
      //signing the user and returning the json web token
      return jwt.sign({id:user.id},JWT_SECRETE);
  },
  userUpdateStatus: async (parent, { status }, { models, user,pubsub }) => {
    
       if (!user) {
            throw new AuthenticationError('You should be signed!');
       }
    const id = user.id;
   
    await models.employee.update(
      { status },
      { where: { id } }
    );

    const allUsers = await models.employee.findAll();
    pubsub.publish('onStatusChange', { onStatusChange: allUsers });
    const newUser = await models.employee.findOne({ where: { id } });

    return newUser;

 }



}


