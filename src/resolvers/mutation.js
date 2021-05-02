const bcrypt = require('bcrypt'); //password increption module
const jwt = require('jsonwebtoken'); //json web token module

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

      const jobSeekerService = new JobSeekerSerivce(models)
     
      const user = await jobSeekerService.signInJobSeeker({input})
    
      //signing the user and returning the json web token
      return jwt.sign({id:user.id},JWT_SECRETE);
  },
  userUpdateStatus: async (parent, { status }, { models, user,pubsub }) => {
    
    const jobSeekerService =new JobSeekerSerivce(models);
    
    const newUser = await jobSeekerService.userUpdateStatus({ user, pubsub, status });

    return newUser;

  },
  jobSeekerUploadProfileImage: async (parent,{profileImag,models,user})=> {
    const jobSeekerService = new JobSeekerSerivce(models);

    const profileImagUri = jobSeekerService.uploadProfileImage({ user, profileImag });
    
    return profileImagUri;
  }
  


}


