const bcrypt = require('bcrypt'); //password increption module
const jwt = require('jsonwebtoken'); //json web token module

const JWT_SECRETE = require('../utils/tokens');

const { JobSeekerSerivce,EmployerService} = require('../services');

module.exports = {
  createJobSeeker:async (parent,{input},{models,pubsub}) => {

      const jobSeekerSerivce = new JobSeekerSerivce(models);

      const JobSeeker = await jobSeekerSerivce.createJobSeeker({ input });

      return jwt.sign({id: JobSeeker.id},JWT_SECRETE);
                                                      
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
  jobSeekerUploadProfileImage: async (parent,{profileImage},{models,user})=> {
    const jobSeekerService = new JobSeekerSerivce(models);

    const profileImagUri = jobSeekerService.uploadProfileImage({ user, profileImage });

    return profileImagUri;
  },
  createEmployer: async (parent, { input }, { models }) => {
    
    const employerService = new EmployerService(models);

    const Employer = await employerService.createEmployer({ input });

    return jwt.sign({ id: Employer.id }, JWT_SECRETE);
  },
  signInEmployer: async (parent, { input }, { models }) => {
    const employerService = new EmployerService(models);

    const Employer = await employerService.signInEmployer({ input });

    return jwt.sign({ id: Employer.id }, JWT_SECRETE);
  }

  
}


