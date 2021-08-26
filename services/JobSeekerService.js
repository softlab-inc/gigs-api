const bcrypt = require("bcrypt"); // password encryption module

const AWS3Service = require("./AWS3Service");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const { AuthenticationError } = require("apollo-server-express");

class JobSeekerSerivce {
  constructor(models) {
    this.models = models;
  }

  async getAllNotifications({ user }) {
    this.isAuthenticatic(user);
    return await this.models.notified.findAll({
      where: { employeeId: user.id },
    });
  }

  isAuthenticatic(user) {
    if (!user) {
      throw new AuthenticationError("Account not found! Please register");
    }
  }

  async getNotifications({ employeeId }) {
    const { gig, notified } = this.models;
    const data = await notified.findAll({
      where: { employeeId },
      include: [gig],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    return data.map((data) => ({
      ...data.get("gig").dataValues,
      ...data.dataValues,
    }));
  }

  async getReadNotifications({ employeeId }) {
    return await this.models.notified.findAll({
      where: { employeeId, isRead: 1 },
    });
  }

  async createGoogleJobSeeker(data) {
    const { employee } = this.models;

    const user = await employee.findOne({ where: { email:data.email } });

    if (user) {
      return user;
    } else {
      return await employee.create({ ...data });
    }
  }

  async getUnReadNotifications({ employeeId }) {
    return await this.models.notified.findAll({
      where: { employeeId, isRead: 0 },
    });
  }

  async createJobSeeker(content) {
    let {
      fullName,
      email,
      phone,
      password,
      document,
      nationalId,
      professionId,
      other,
    } = content.input;

    email = email.trim().toLowerCase();

    const { employee, employeeProfession, profession } = this.models;

    // hashing the user password
    const hashed = await bcrypt.hash(password, 10);

    let documentImageUri = "";
    let nationalIdImageUri = "";

    const user = await employee.findOne({ where: { email } });

    if (!user) {
      // uploading images to Amazon S3
      let result = await AWS3Service.handleFileUpload(nationalId);
      nationalIdImageUri = result.Location;

      result = await AWS3Service.handleFileUpload(document);
      documentImageUri = result.Location;
    } else {
      throw new AuthenticationError(
        "Oops. Looks like you already have an account with this email address. Please try to login."
      );
    }

    const JobSeeker = await employee.create({
      fullName,
      email,
      phone,
      password: hashed,
      documentImageUri,
      nationalIdImageUri,
    });

    await this.attachUserToProfile(
      other,
      profession,
      employeeProfession,
      JobSeeker,
      professionId
    );

    return JobSeeker;
  }

  async attachUserToProfile(
    other,
    profession,
    employeeProfession,
    JobSeeker,
    professionId
  ) {
    if (other) {
      const newProfession = await profession.create({ name: other });
      await employeeProfession.create({
        professionId: newProfession.id,
        employeeId: JobSeeker.id,
      });
    } else {
      await employeeProfession.create({
        professionId,
        employeeId: JobSeeker.id,
      });
    }
  }

  isPhoneNumberUsed(user2) {
    if (user2) {
      throw new AuthenticationError(
        "Phone number has already been used, try again another!"
      );
    }
  }

  isEmailUsed(user) {
    console.log(AuthenticationError);
    if (user) {
      throw new AuthenticationError(
        "Email has already been used, try again another!"
      );
    }
  }

  async getProfessions({ employeeId }) {
    const { employeeProfession, profession } = this.models;
    const data = await employeeProfession.findAll({
      where: { employeeId },
      include: [profession],
    });
    return data.map((data) => data.get("profession"));
  }

  async signInJobSeeker(content) {
    let { email, password } = content.input;
    email = email.trim().toLowerCase();
    const user = await this.models.employee.findOne({ where: { email } });

    this.isAuthenticatic(user);

    // comparing the password with the hash stored in the database
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError("Incorrrect password! try gain");
    }

    return user;
  }

  async userUpdateStatus({ status, user, pubsub }) {
    if (!user) {
      throw new AuthenticationError("You should be signed!");
    }

    const id = user.id;

    await this.models.employee.update({ status }, { where: { id } });

    const newUser = await this.models.employee.findOne({ where: { id } });

    pubsub.publish("onStatusChange", { onStatusChange: newUser });

    return newUser;
  }

  async uploadProfileImage({ user, profileImage }) {
    if (!user) {
      throw new AuthenticationError("You should be signed!");
    }

    const id = user.id;

    let profileImagUri = "";

    // profileImagUri = await getResult(profileImage, PROFILE_FOLDER);
    const result = await AWS3Service.handleFileUpload(profileImage);

    profileImagUri = result.Location;

    await this.models.employee.update({ profileImagUri }, { where: { id } });

    return await this.models.employee.findOne({ where: { id } });
  }

  async jobSeeker({ user }) {
    this.isAuthenticatic(user);

    const { id } = user;

    return await this.models.employee.findOne({ where: { id } });
  }

  async updatePushToken({ user, pushToken }) {
    if (!user) {
      throw new AuthenticationError("You should be signed!");
    }

    await this.models.employee.update(
      { pushToken },
      { where: { id: user.id } }
    );
    return await this.jobSeeker({ user });
  }

  async jobSeekerSendMessage({ content, employerId, user, pubsub }) {
    this.isAuthenticatic(user);
    const jobSeeker = await this.getGetJobSeeker({ id: user.id });
    const { fullName, profileImagUri } = jobSeeker.dataValues;
    const message = await this.models.chat.create({
      content,
      employerId,
      avatar: profileImagUri,
      employeeId: user.id,
      fullName,
      from: user.id,
      to: employerId,
    });
    pubsub.publish("onJobSeekerSentMessage", {
      onJobSeekerSentMessage: {
        _id: message.dataValues.id,
        text: message.dataValues.content,
        ...message.dataValues,
      },
    });
    return {
      _id: message.dataValues.id,
      text: message.dataValues.content,
      ...message.dataValues,
    };
  }

  async getChats({ user, employerId }) {
    this.isAuthenticatic(user);
    return await this.models.chat.findAll({
      where: { employeeId: user.id, employerId },
      order: [["createdAt", "DESC"]],
      limit: 40,
    });
  }

  async getEmployer({ id }) {
    return await this.models.employer.findOne({ where: id });
  }

  async getGetJobSeeker({ id }) {
    return await this.models.employee.findOne({ where: id });
  }

  async hasAcceptedAlready({ gigId, employeeId }) {
    return await this.models.accepted.findOne({ where: { gigId, employeeId } });
  }

  async acceptGig({ args, user }) {
    this.isAuthenticatic(user);
    const employer = await this.getEmployer({ id: args.employerId });
    if (
      await this.hasAcceptedAlready({ gigId: args.gigId, employeeId: user.id })
    ) {
      throw new Error("Employer notified already");
    } else {
      return await this.models.accepted.create({
        ...args,
        pushToken: employer.dataValues.pushToken,
        employeeId: user.id,
      });
    }
  }

  async jobSeekerUpdateData({ user, phone, bio }) {
    this.isAuthenticatic(user);
    await this.models.employee.update(
      { phone, bio },
      { where: { id: user.id } }
    );
    return await this.jobSeeker({ user });
  }

  async getPendingGigs({ employeeId }) {
    const data = await this.models.employeeGig.findAll({
      where: { employeeId },
      include: [this.models.gig],
      order: [["id", "DESC"]],
    });
    return data.map((data) => ({
      ...data.dataValues,
      ...data.get("gig").dataValues,
    }));
  }

  async getRecentEmployers({ employeeId }) {
    const result = await this.models.employeeGig.findAll({
      where: { employeeId },
      attributes: ["gigId"],
      raw: true,
      group: ["gigId"],
      order: [["id", "DESC"]],
    });

    const gigIds = result.map((data) => data.gigId);

    const data = await this.models.gig.findAll({
      where: { id: { [Op.in]: gigIds } },
      include: [this.models.employer],
      group: ["employerId"],
    });

    const employers = data.map((data) => data.get("employer"));

    return employers;
  }

  async updateGigStatus({ user, gigId, status }) {
    this.isAuthenticatic(user);
    await this.models.employeeGig.update(
      { isStarted: status },
      { where: { gigId, employeeId: user.id } }
    );
    return await this.getPendingGigs({ employeeId: user.id });
  }

  async updateReadNotifications({ user }) {
    this.isAuthenticatic(user);
    const result = await this.models.notified.findAll({
      where: { isRead: 0, employeeId: user.id },
    });
    const iDs = result.map((data) => data.dataValues.id);
    if (iDs.length !== 0) {
      return await this.models.notified.update(
        { isRead: 1 },
        { where: { id: { [Op.in]: iDs } } }
      );
    }
  }

  async findByEmail({ email, cryptr }) {
    const user = await this.models.employee.findOne({ where: { email } });
    this.isAuthenticatic(user);
    const encryptedString = cryptr.encrypt(user.dataValues.id);
    return encryptedString;
  }

  async updatePassword({ id, password, confirmPassword, cryptr }) {
    const userId = Number(cryptr.decrypt(id));
    console.log(userId);
    if (isNaN(userId)) {
      throw new Error(
        "Request is not authenticated, we can't update your password now"
      );
    } else {
      if (password === confirmPassword) {
        const hashed = await bcrypt.hash(password, 10);
        await this.models.employee.update(
          { password: hashed },
          { where: { id: userId } }
        );
        return "Password has been update sccessfully go back to the app and login with the new password";
      } else {
        throw new Error("Passwords provided don't match!! Plese try again");
      }
    }
  }

  async getMessageSenders({ user }) {
    this.isAuthenticatic(user);

    let data = await this.models.chat.findAll({
      where: { employeeId: user.id },
      include: ["employer"],
      group: ["employerId"],
    });

    data = data.map((data) => ({
      ...data.dataValues,
      ...data.get("employer").dataValues,
    }));
    console.log({ data });
    return data;
  }
}

module.exports = JobSeekerSerivce;
