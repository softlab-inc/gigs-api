const bcrypt = require("bcrypt"); // password encryption module

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

const AWS3Service = require("./AWS3Service");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const PAY_BY_FULL_AMOUNT = 0; // employers shall pay full amount
const PAY_BY_HOURLY_RATE = 1; // employers shall pay full hourly rate
const OTHER_PROFESION = 31;

class EmployerService {
  constructor(models) {
    this.models = models;
  }

  async createEmployer(content) {
    let { fullName, email, phone, password, companyName, license } =
      content.input;

    console.log({ fullName, email, phone, password, companyName, license });

    email = email.trim().toLowerCase();

    const { employer } = this.models;

    // hashing the user password
    const hashed = await bcrypt.hash(password, 10);

    let licenseImageUri = "";

    const user = await employer.findOne({ where: { email } });

    console.log({ user });

    if (!user) {
      const result = await AWS3Service.handleFileUpload(license);
      licenseImageUri = result.Location;
    } else {
      throw new AuthenticationError(
        "Oops. Looks like you already have an account with this email address. Please try to login."
      );
    }

    const Employer = await employer.create({
      fullName,
      companyName,
      email,
      phone,
      password: hashed,
      licenseImageUri,
    });

    console.log(Employer);

    return Employer;
  }

  async signInEmployer(content) {
    let { email, password } = content.input;
    email = email.trim().toLowerCase();

    const user = await this.models.employer.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError("User account not found! try again");
    }

    // comparing the password with the hash stored in the database
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError("Wrong password for this email, try again");
    }

    return user;
  }

  async employer({ user }) {
    if (!user) {
      throw new AuthenticationError("You should be signed!");
    }

    const { id } = user;
    return await this.models.employer.findOne({ where: { id } });
  }

  // employer creating their own profesion type
  async employeeCreateProfession(profession) {
    const result = await this.findProfessionByName(profession);

    if (result) {
      return result.dataValues.id;
    } else {
      const newProf = await this.models.profession.create({ name: profession });
      return newProf.dataValues.id;
    }
  }

  async findProfessionByName(name) {
    return await this.models.profession.findOne({ where: { name } });
  }

  async employerCreateGig({ input, user, pubsub }) {
    const { paymentMethod } = input;

    if (!user) {
      throw new AuthenticationError("You should be signed!");
    }

    try {
      if (input.professionId === OTHER_PROFESION) {
        const professionId = await this.employeeCreateProfession(input.other);
        input.professionId = professionId;
        console.log({ input });
        if (paymentMethod === PAY_BY_FULL_AMOUNT) {
          const gig = await this.models.gig.create({
            ...input,
            paymentMethod: PAY_BY_FULL_AMOUNT,
            employerId: user.id,
          });
          pubsub.publish("onGigCreated", { onGigCreated: gig.dataValues });
          return gig.dataValues;
        } else {
          const gig = await this.models.gig.create({
            ...input,
            paymentMethod: PAY_BY_HOURLY_RATE,
            employerId: user.id,
          });
          pubsub.publish("onGigCreated", { onGigCreated: gig.dataValues });
          return gig.dataValues;
        }
      } else {
        if (paymentMethod === PAY_BY_FULL_AMOUNT) {
          const gig = await this.models.gig.create({
            ...input,
            paymentMethod: PAY_BY_FULL_AMOUNT,
            employerId: user.id,
          });
          pubsub.publish("onGigCreated", { onGigCreated: gig.dataValues });
          return gig.dataValues;
        } else {
          const gig = await this.models.gig.create({
            ...input,
            paymentMethod: PAY_BY_HOURLY_RATE,
            employerId: user.id,
          });
          pubsub.publish("onGigCreated", { onGigCreated: gig.dataValues });
          return gig.dataValues;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  isAuthenticatic(user) {
    if (!user) {
      throw new AuthenticationError("Account not found! register");
    }
  }

  async getEmployer({ id }) {
    return await this.models.employer.findOne({ where: id });
  }

  async getEmployers() {
    return await this.models.employer.findAll();
  }

  async employerSendMessage({ content, employeeId, user, pubsub }) {
    this.isAuthenticatic(user);
    const employer = await this.getEmployer({ id: user.id });
    const { fullName, profileImagUri } = employer.dataValues;
    const message = await this.models.chat.create({
      content,
      employeeId,
      avatar: profileImagUri,
      employerId: user.id,
      fullName,
      from: user.id,
      to: employeeId,
    });
    pubsub.publish("onEmployerSentMessage", {
      onEmployerSentMessage: {
        _id: message.dataValues.id,
        text: message.dataValues.content,
        avatar: message.dataValues.avatar,
        ...message.dataValues,
      },
    });
    return {
      _id: message.dataValues.id,
      text: message.dataValues.content,
      ...message.dataValues,
    };
  }

  async getChats({ user, employeeId }) {
    this.isAuthenticatic(user);
    return await this.models.chat.findAll({
      where: { employerId: user.id, employeeId },
      order: [["createdAt", "DESC"]],
    });
  }

  async updatePushToken({ user, pushToken }) {
    this.isAuthenticatic(user);

    await this.models.employer.update(
      { pushToken },
      { where: { id: user.id } }
    );

    return await this.employer({ user });
  }

  async getCreatedGigs({ user }) {
    this.isAuthenticatic(user);
    return await this.models.gig.findAll({
      where: { employerId: user.id },
      order: [["createdAt", "DESC"]],
    });
  }

  async getCreatedGig({ user }) {
    this.isAuthenticatic(user);
    return await this.models.gig.findOne({ where: { employerId: user.id } });
  }

  async isJobSeekerHiredForJob({ employeeId, gigId }) {
    await this.models.accepted.update(
      { hasAccepted: 1 },
      { where: { employeeId, gigId } }
    );
    return await this.models.employeeGig.findOne({
      where: { employeeId, gigId },
    });
  }

  async employerHire({ gigId, employeeId, user }) {
    this.isAuthenticatic(user);

    const { employee: employeeModel, gig: gigModel, employeeGig } = this.models;

    if (await this.isJobSeekerHiredForJob({ employeeId, gigId })) {
      throw new ForbiddenError("Job Seeker Already hired for job!");
    } else {
      const employee = await employeeModel.findOne({
        where: { id: employeeId },
      });

      const gig = await gigModel.findOne({ where: { id: gigId } });

      // gnerate message to send
      const employeeAndGig = {
        ...employee.dataValues,
        ...gig.dataValues,
        employeeId,
        gigId,
      };

      await employeeGig.create({ employeeId, gigId });

      return employeeAndGig;
    }
  }

  async getRecentHires({ user }) {
    this.isAuthenticatic(user);
    const employerId = user.id;
    const gigs = await this.models.gig.findAll({
      where: { employerId },
      attributes: ["id"],
      order: [["createdAt", "DESC"]],
    });
    const gigIds = gigs.map((data) => data.dataValues.id);
    const employees = await this.models.employeeGig.findAll({
      where: { gigId: { [Op.in]: gigIds } },
      include: ["employee"],
      group: ["employeeId"],
    });
    return employees.map((data) => data.get("employee").dataValues);
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

    await this.models.employer.update({ profileImagUri }, { where: { id } });

    return await this.models.employer.findOne({ where: { id } });
  }

  async employerUpdateData({ user, phone }) {
    this.isAuthenticatic(user);
    await this.models.employer.update({ phone }, { where: { id: user.id } });
    return await this.employer({ user });
  }

  async findById({ id }) {
    const user = await this.models.employer.findOne({
      where: { id },
      attributes: ["email"],
    });
    return user.dataValues;
  }

  async updateReadNotifications({ user }) {
    this.isAuthenticatic(user);
    const result = await this.models.accepted.findAll({
      where: { isRead: 0, employerId: user.id },
    });
    const iDs = result.map((data) => data.dataValues.id);
    if (iDs.length !== 0) {
      return await this.models.accepted.update(
        { isRead: 1 },
        { where: { id: { [Op.in]: iDs } } }
      );
    }
  }

  async findByEmail({ email, cryptr }) {
    const user = await this.models.employer.findOne({ where: { email } });
    this.isAuthenticatic(user);
    const encryptedString = cryptr.encrypt(user.dataValues.id);
    return encryptedString;
  }

  async updatePassword({ id, password, confirmPassword, cryptr }) {
    const userId = Number(cryptr.decrypt(id));
    if (isNaN(userId)) {
      throw new Error(
        "Request is not authenticated, we can't update your password now"
      );
    } else {
      if (password === confirmPassword) {
        const hashed = await bcrypt.hash(password, 10);
        await this.models.employer.update(
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
    const data = await this.models.chat.findAll({
      where: { employerId: user.id },
      include: ["employee"],
      group: ["employeeId"],
    });
    return data.map((data) => ({
      ...data.dataValues,
      ...data.get("employee").dataValues,
    }));
  }
}

module.exports = EmployerService;
