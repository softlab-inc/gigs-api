const jwt = require("jsonwebtoken"); // json web token module

module.exports = {
  createJobSeeker: async (_, { input }, { services: { JobSeekerService } }) => {
    const JobSeeker = await JobSeekerService.createJobSeeker({ input });
    return jwt.sign({ id: JobSeeker.id }, process.env.JWT_SECRETE);
  },
  createJobSeeker2: async (
    _,
    { input },
    { services: { JobSeekerService } }
  ) => {
    const JobSeeker = await JobSeekerService.createJobSeeker2({ input });
    return jwt.sign({ id: JobSeeker.id }, process.env.JWT_SECRETE);
  },
  createGoogleJobSeeker: async (
    _,
    args,
    { services: { JobSeekerService } }
  ) => {
    const JobSeeker = await JobSeekerService.createGoogleJobSeeker(args, jwt);
    return JobSeeker;
  },
  updateProfession: async (
    _,
    { other, professionId },
    { services: { JobSeekerService }, user }
  ) => {
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
  signInJobSeeker: async (_, { input }, { services: { JobSeekerService } }) => {
    const user = await JobSeekerService.signInJobSeeker({ input });

    // signing the user and returning the json web token
    return jwt.sign({ id: user.id }, process.env.JWT_SECRETE);
  },
  userUpdateStatus: async (
    _,
    { status },
    { services: { JobSeekerService }, user, pubsub }
  ) => {
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
  employerUploadProfileImage: async (
    _,
    { profileImage },
    { services: { EmployerService }, user }
  ) => {
    const newUser = EmployerService.uploadProfileImage({ user, profileImage });

    return newUser;
  },
  createEmployer: async (_, { input }, { services: { EmployerService } }) => {
    const Employer = await EmployerService.createEmployer({ input });

    return jwt.sign({ id: Employer.id }, process.env.JWT_SECRETE);
  },
  signInEmployer: async (_, { input }, { services: { EmployerService } }) => {
    const Employer = await EmployerService.signInEmployer({ input });

    return jwt.sign({ id: Employer.id }, process.env.JWT_SECRETE);
  },
  employerCreateGig: async (
    _,
    { input },
    {
      services: { EmployerService, GigService, NotificationService },
      user,
      pubsub,
    }
  ) => {
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
    { services: { EmployerService }, user }
  ) => {
    return await EmployerService.updatePushToken({ user, pushToken });
  },
  jobSeekerSendMessage: async (
    _,
    { content, employerId },
    { services: { JobSeekerService,EmployerService, MailerService}, user, pubsub }
  ) => {
     
    let recieverMail = await EmployerService.findById({ id: employerId });
    await MailerService.sendMailToAny({...recieverMail,message:"You have a new message, Open your Gigs App",subject:"New message"})
  
    return await JobSeekerService.jobSeekerSendMessage({
      content,
      employerId,
      user,
      pubsub,
    });
  },
  employerSendMessage: async (
    _,
    { content, employeeId },
    { services: { EmployerService,JobSeekerService, MailerService }, user, pubsub }
  ) => {
  
    let recieverMail = await JobSeekerService.findById({ id: employeeId });
    await MailerService.sendMailToAny({...recieverMail,message:"You have a new message, Open your Gigs App",subject:"New message"})
  
    return await EmployerService.employerSendMessage({
      content,
      employeeId,
      user,
      pubsub,
    });
  },

  sendEmail: async (
    _,
    { email, isEmployer },
    { servies: { EmployerService, JobSeekerService, MailerService }, cryptr }
  ) => {
    let id = "";

    if (isEmployer) {
      id = await EmployerService.findByEmail({ email, cryptr });
    } else {
      id = await JobSeekerService.findByEmail({ email, cryptr });
    }

    return await MailerService.sendMail({ email, id, isEmployer });
  },

  gigAccepted: async (
    _,
    args,
    { services: { JobSeekerService, NotificationService }, user, pubsub }
  ) => {
    const accepted = await JobSeekerService.acceptGig({ args, user, pubsub });
    console.log({ accepted });
    console.log([{ ...accepted.dataValues }]);

    const messages = NotificationService.generateAcceptedMessages([
      { ...accepted.dataValues },
    ]);
    console.log({ messages });
    const tickets = await NotificationService.createChunckOfNotifications(
      messages
    );
    console.log({ tickets });
    pubsub.publish("onAcceptGig", { onAcceptGig: accepted });
    return accepted;
  },
  uploadFiletoS3: async (_, { file }, { services: { AWS3Service } }) => {
    const result = await AWS3Service.handleFileUpload(file);
    const { Location } = result;
    return Location;
  },
  jobSeekerUpdateData: async (
    _,
    { phone, bio },
    { services: { JobSeekerService }, user }
  ) => {
    const newUser = await JobSeekerService.jobSeekerUpdateData({
      phone,
      bio,
      user,
    });
    return newUser;
  },
  employerUpdateData: async (
    _,
    { phone },
    { services: { EmployerService }, user }
  ) => {
    return await EmployerService.employerUpdateData({ phone, user });
  },
  testSubScription: async (_, { token }, { models, user, pubsub }) => {
    pubsub.publish("onTestSubscription", { onTestSubscription: token });
    return token;
  },
  employerHireJobSeeker: async (
    _,
    { gigId, employeeId },
    { services: { EmployerService, NotificationService }, pubsub, user }
  ) => {
    const employeeAndGig = await EmployerService.employerHire({
      gigId,
      employeeId,
      user,
    });
    const messages = NotificationService.generateHiredMessages([
      { ...employeeAndGig },
    ]);
    console.log({ messages });
    const tickets = await NotificationService.createChunckOfNotifications(
      messages
    );
    console.log(tickets);
    pubsub.publish("onJobSeekerHired", {
      onJobSeekerHired: { ...employeeAndGig },
    });
    return employeeAndGig;
  },
  employeeUpdateGigStatus: async (
    _,
    { gigId, status },
    { services: { JobSeekerService }, user }
  ) => {
    return await JobSeekerService.updateGigStatus({ user, gigId, status });
  },
  employerUpdateReadNotifications: async (
    _,
    args,
    { user, services: { EmployerService } }
  ) => {
    await EmployerService.updateReadNotifications({ user });
    return "Notifications update successfully...";
  },
  jobSeekerUpdateReadNotifications: async (
    _,
    args,
    { user, services: { JobSeekerService } }
  ) => {
    await JobSeekerService.updateReadNotifications({ user });
    return "Notifications update successfully...";
  },
  jobSeekerUpdatePassword: async (
    _,
    { id, password, confirmPassword },
    { services: { JobSeekerService }, cryptr }
  ) => {
    return await JobSeekerService.updatePassword({
      id,
      password,
      confirmPassword,
      cryptr,
    });
  },
  employerUpdatePassword: async (
    _,
    { id, password, confirmPassword },
    { services: { EmployerService }, cryptr }
  ) => {
    return await EmployerService.updatePassword({
      id,
      password,
      confirmPassword,
      cryptr,
    });
  },
};
