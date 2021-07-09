const jwt = require('jsonwebtoken'); //json web token module

const { JobSeekerSerivce,EmployerService,GigService,NotificationService,MailerService,AWS3Service} = require('../services');


module.exports = {
  createJobSeeker:async (parent,{input},{models,pubsub}) => {

      const jobSeekerSerivce = new JobSeekerSerivce(models);

        try {
          const JobSeeker = await jobSeekerSerivce.createJobSeeker({ input });

          return jwt.sign({id: JobSeeker.id},process.env.JWT_SECRETE);
        } catch (error) {
           
          console.log({ error });
            throw new Error(`Duplicated email ${error}`);
        }
                                                      
  },
  createProfession:async (parent,{input},{models}) => {
      //Mapping the list of names to {name:value}
      const  nameArr =   input.names.map(name => ({name}));

      try { 
        await models.profession.bulkCreate(nameArr);
        return 'Professions created successfully'
      } catch (error) { 
        throw new Error(`Duplicated profession values ${error}`);
      }
  
  },  
  signInJobSeeker:async (parent,{input},{models}) => {

      const jobSeekerService = new JobSeekerSerivce(models)
      
      const user = await jobSeekerService.signInJobSeeker({input})
    
      //signing the user and returning the json web token
      return jwt.sign({id:user.id},process.env.JWT_SECRETE);
  },
  userUpdateStatus: async (parent, { status }, { models, user,pubsub }) => {
    
    const jobSeekerService =new JobSeekerSerivce(models);
    
    const newUser = await jobSeekerService.userUpdateStatus({ user, pubsub, status });

    return newUser; 

  },
  jobSeekerUploadProfileImage: async (parent,{profileImage},{models,user})=> {
    const jobSeekerService = new JobSeekerSerivce(models);

    const newUser = jobSeekerService.uploadProfileImage({ user, profileImage });

    return newUser;
  },
  employerUploadProfileImage: async (parent,{profileImage},{models,user})=> {
     const employerService = new EmployerService(models);

    const newUser = employerService.uploadProfileImage({ user, profileImage });

    return newUser;
  },

  createEmployer: async (parent, { input }, { models }) => {
    
    const employerService = new EmployerService(models);

    const Employer = await employerService.createEmployer({ input });

    return jwt.sign({ id: Employer.id }, process.env.JWT_SECRETE);
  },
  signInEmployer: async (parent, { input }, { models }) => {
    const employerService = new EmployerService(models);

    const Employer = await employerService.signInEmployer({ input });

    return jwt.sign({ id: Employer.id }, process.env.JWT_SECRETE);
  },
  employerCreateGig: async (parent, { input }, { models, user, pubsub }) => {
    
    const employerService = new EmployerService(models);

    const notificationService = new NotificationService()
    
    const gigService = new GigService(models);

    const gig = await employerService.employerCreateGig({ user, input, pubsub });
    console.log({gig})
    const notifiedEmployees = await gigService.notifyAllJobSeekers(gig);

    console.log({notifiedEmployees});

    const messages = notificationService.generateMessages(notifiedEmployees);
    console.log({messages})
    const tickets =await notificationService.createChunckOfNotifications(messages);
    
    console.log({ tickets });
   
    return gig; 
  },
  jobSeekerUpdatePushNotification: async (parent, {pushToken}, {models,user}) => {
    const jobSeekerService =new JobSeekerSerivce(models);
    return await jobSeekerService.updatePushToken({ user, pushToken });
  },
  employerUpdatePushNotification: async (parent, {pushToken}, {models,user}) => {
    const employerService = new EmployerService(models);
    return await employerService.updatePushToken({ user, pushToken });
  },
  jobSeekerSendMessage: async (parent, { content, employerId }, { models, user, pubsub }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
     return await jobSeekerService.jobSeekerSendMessage({content,employerId,user,pubsub})
  },
  employerSendMessage: async (parent, { content, employeeId }, { models, user, pubsub }) => {
     const employerService = new EmployerService(models);
     return await employerService.employerSendMessage({content, employeeId, user, pubsub});
  },
  sendEmail: async (parent, { email }, context) => {
    const result  =  new MailerService();
    return  await result.sendMail(email); 
  },
  gigAccepted: async (parent, args, { models,user,pubsub }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    const accepted = await jobSeekerService.acceptGig({ args, user, pubsub });
    console.log({ accepted });
    console.log([{ ...accepted.dataValues }]);
    const notificationService = new NotificationService();
    let messages = notificationService.generateAcceptedMessages([{ ...accepted.dataValues }]);
    console.log({ messages });
    let tickets = await notificationService.createChunckOfNotifications(messages);
    console.log({ tickets });
    pubsub.publish('onAcceptGig', {onAcceptGig:accepted});
    return accepted;
  },
  uploadFiletoS3: async (parent, { file }, context) => {
    const result = await AWS3Service.handleFileUpload(file);
    const { Location } = result;
    return Location;    
  },
  jobSeekerUpdateData: async (parent, { phone, bio }, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    const newUser = await jobSeekerService.jobSeekerUpdateData({ phone, bio,user });
    return newUser; 
  },
  employerUpdateData: async (parent, { phone}, { models, user }) => {
   const employerService = new EmployerService(models);
    const newUser = await employerService.employerUpdateData({ phone,user });
    return newUser;   
  },
  testSubScription: async (parent, { token }, { models, user, pubsub }) => {
    pubsub.publish('onTestSubscription', { onTestSubscription: token });
    return token;
  }, 
   employerHireJobSeeker: async (parent, { gigId, employeeId }, { models, pubsub, user }) => {
      const employerService = new EmployerService(models);
      const notificationService = new NotificationService();
     const employeeAndGig = await employerService.employerHire({ gigId, employeeId, user });
     const messages = notificationService.generateHiredMessages([{...employeeAndGig}]);
     console.log({ messages })
     const tickets = await notificationService.createChunckOfNotifications(messages);
     console.log(tickets);
    pubsub.publish('onJobSeekerHired', { onJobSeekerHired: { ...employeeAndGig } });
    return employeeAndGig;
  },
  employeeUpdateGigStatus: async (parent, { gigId, status }, { models, user })=> {
  const jobSeekerService = new JobSeekerSerivce(models);
  return await jobSeekerService.updateGigStatus({user,gigId,status})
  },
  employerUpdateReadNotifications: async (parent, args, { user, models }) => {
    const employerService = new EmployerService(models);
    await employerService.updateReadNotifications({ user });
    return 'Notifications update successfully...';
  },
  jobSeekerUpdateReadNotifications: async (parent, args, { user, models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    await jobSeekerService.updateReadNotifications({ user });
    return 'Notifications update successfully...';
  },

  
}
 
 


/**
 
   id
      name
      status
      days
      budget
      createdBy{
        id
        fullName
      }
      updatedAt
      createdAt
 
 
 */

