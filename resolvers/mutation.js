const jwt = require("jsonwebtoken"); // json web token module

const {
  JobSeekerSerivce,
  EmployerService,
  GigService,
  NotificationService,
  MailerService,
  AWS3Service,
} = require("../services");

module.exports = {
  createJobSeeker: async (_, { input }, { services:{JobSeekerService} }) => {
    const JobSeeker = await JobSeekerService.createJobSeeker({ input });
    return jwt.sign({ id: JobSeeker.id }, process.env.JWT_SECRETE);
  },
  createJobSeeker2: async (_, { input }, {  services:{JobSeekerService}  }) => {
    const JobSeeker = await JobSeekerService.createJobSeeker2({ input });
    return jwt.sign({ id: JobSeeker.id }, process.env.JWT_SECRETE);
  },
  createGoogleJobSeeker: async (_, args, { services: { JobSeekerService } } ) => {
    const JobSeeker = await JobSeekerService.createGoogleJobSeeker(args,jwt);
    return JobSeeker;
  },
  updateProfession: async (_, { other, professionId }, { services: { JobSeekerService }, user }) => {
  
    try {
      let result = await JobSeekerService.updateProfession({ 
        other,
        professionId, 
        user,
      });
      return jwt.sign({ id: result }, process.env.JWT_SECRETE);
    } catch (error) {
      throw new Error(`Error occured while updating profession`);
    }
  },
  signInJobSeeker: async (_, { input }, { services: { JobSeekerService }}) => {

    const user = await JobSeekerService.signInJobSeeker({ input });

    // signing the user and returning the json web token
    return jwt.sign({ id: user.id }, process.env.JWT_SECRETE);
  },
  userUpdateStatus: async (_, { status }, { services: { JobSeekerService }, user, pubsub }) => {

    const newUser = await JobSeekerService.userUpdateStatus({
      user,
      pubsub,
      status,
    });

    return newUser;
  },
  jobSeekerUploadProfileImage: async (
    _,
    { profileImage },
    { services: { JobSeekerService }, user }
  ) => {

    const newUser = JobSeekerService.uploadProfileImage({ user, profileImage });

    return newUser;
  },
  employerUploadProfileImage: async (_, { profileImage }, { services: {EmployerService}, user }) => {

    const newUser = EmployerService.uploadProfileImage({ user, profileImage });

    return newUser;
  },
  createEmployer: async (_, { input }, {  services: {EmployerService} }) => {

    const Employer = await EmployerService.createEmployer({ input });

    return jwt.sign({ id: Employer.id }, process.env.JWT_SECRETE);
  },
  signInEmployer: async (_, { input }, {  services: {EmployerService} }) => {

    const Employer = await EmployerService.signInEmployer({ input });

    return jwt.sign({ id: Employer.id }, process.env.JWT_SECRETE);
  },
  employerCreateGig: async (_, { input }, {  services: {EmployerService,GigService,NotificationService}, user, pubsub }) => {

    const gig = await EmployerService.employerCreateGig({
      user,
      input,
      pubsub,
    });
    console.log({ gig });
    const notifiedEmployees = await GigService.notifyAllJobSeekers(gig);

    console.log({ notifiedEmployees });

    const messages = NotificationService.generateMessages(notifiedEmployees);
    console.log({ messages });
    const tickets = await NotificationService.createChunckOfNotifications(
      messages
    );

    console.log({ tickets });

    return gig;
  },
  jobSeekerUpdatePushNotification: async (
    _,
    { pushToken },
    { services: { JobSeekerService }, user }
  ) => {
    return await JobSeekerService.updatePushToken({ user, pushToken });
  },
  employerUpdatePushNotification: async (
    _,
    { pushToken },
    {  services: { EmployerService }, user }
  ) => {
    return await EmployerService.updatePushToken({ user, pushToken });
  },
  jobSeekerSendMessage: async (
    _,
    { content, employerId },
    { models, user, pubsub }
  ) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.jobSeekerSendMessage({
      content,
      employerId,
      user,
      pubsub,
    });
  },
  employerSendMessage: async (
    _,
    { content, employeeId },
    { models, user, pubsub }
  ) => {
    const employerService = new EmployerService(models);
    return await employerService.employerSendMessage({
      content,
      employeeId,
      user,
      pubsub,
    });
  },
  sendEmail: async (_, { email, isEmployer }, { models, cryptr }) => {
    const result = new MailerService();
    const employerService = new EmployerService(models);
    const jobSeekerService = new JobSeekerSerivce(models);

    let id = "";

    if (isEmployer) {
      id = await employerService.findByEmail({ email, cryptr });
    } else {
      id = await jobSeekerService.findByEmail({ email, cryptr });
    }

    return await result.sendMail({ email, id, isEmployer });
  },
  gigAccepted: async (_, args, { models, user, pubsub }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    const accepted = await jobSeekerService.acceptGig({ args, user, pubsub });
    console.log({ accepted });
    console.log([{ ...accepted.dataValues }]);
    const notificationService = new NotificationService();
    const messages = notificationService.generateAcceptedMessages([
      { ...accepted.dataValues },
    ]);
    console.log({ messages });
    const tickets = await notificationService.createChunckOfNotifications(
      messages
    );
    console.log({ tickets });
    pubsub.publish("onAcceptGig", { onAcceptGig: accepted });
    return accepted;
  },
  uploadFiletoS3: async (_, { file }, context) => {
    const result = await AWS3Service.handleFileUpload(file);
    const { Location } = result;
    return Location;
  },
  jobSeekerUpdateData: async (_, { phone, bio }, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    const newUser = await jobSeekerService.jobSeekerUpdateData({
      phone,
      bio,
      user,
    });
    return newUser;
  },
  employerUpdateData: async (_, { phone }, { models, user }) => {
    const employerService = new EmployerService(models);
    const newUser = await employerService.employerUpdateData({ phone, user });
    return newUser;
  },
  testSubScription: async (_, { token }, { models, user, pubsub }) => {
    pubsub.publish("onTestSubscription", { onTestSubscription: token });
    return token;
  },
  employerHireJobSeeker: async (
    _,
    { gigId, employeeId },
    { models, pubsub, user }
  ) => {
    const employerService = new EmployerService(models);
    const notificationService = new NotificationService();
    const employeeAndGig = await employerService.employerHire({
      gigId,
      employeeId,
      user,
    });
    const messages = notificationService.generateHiredMessages([
      { ...employeeAndGig },
    ]);
    console.log({ messages });
    const tickets = await notificationService.createChunckOfNotifications(
      messages
    );
    console.log(tickets);
    pubsub.publish("onJobSeekerHired", {
      onJobSeekerHired: { ...employeeAndGig },
    });
    return employeeAndGig;
  },
  employeeUpdateGigStatus: async (_, { gigId, status }, { models, user }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.updateGigStatus({ user, gigId, status });
  },
  employerUpdateReadNotifications: async (_, args, { user, models }) => {
    const employerService = new EmployerService(models);
    await employerService.updateReadNotifications({ user });
    return "Notifications update successfully...";
  },
  jobSeekerUpdateReadNotifications: async (_, args, { user, models }) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    await jobSeekerService.updateReadNotifications({ user });
    return "Notifications update successfully...";
  },
  jobSeekerUpdatePassword: async (
    _,
    { id, password, confirmPassword },
    { models, cryptr }
  ) => {
    const jobSeekerService = new JobSeekerSerivce(models);
    return await jobSeekerService.updatePassword({
      id,
      password,
      confirmPassword,
      cryptr,
    });
  },
  employerUpdatePassword: async (
    _,
    { id, password, confirmPassword },
    { models, cryptr }
  ) => {
    const employerService = new EmployerService(models);
    return await employerService.updatePassword({
      id,
      password,
      confirmPassword,
      cryptr,
    });
  },
};
