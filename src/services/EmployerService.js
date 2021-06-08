const bcrypt = require('bcrypt'); //password encryption module
const storeFS = require('../utils/storeFS');

const { AuthenticationError,ForbiddenError } = require('apollo-server-express');
const profession = require('../models/profession');
const AWS3Service  = require('./AWS3Service');

const LICENSE_FOLDER = 3
const PAY_BY_FULL_AMOUNT = 0; //employers shall pay full amount
const PAY_BY_HOURLY_RATE = 1;//employers shall pay full hourly rate 
const OTHER_PROFESION = 31;

/**
 * 
 * @param {*} uploadFile upload file object containing filename  mimetype encoding and createReadStream() function
 * @param {*} dirIndex  index to the folder locatoin where the image should be stored
 * @returns 
 */
const getResult =async (uploadFile,dirIndex) => {
   const {filename,createReadStream } =await  uploadFile;
    const stream = createReadStream();
    const result = await storeFS({ stream, filename },dirIndex);
    return result.filename;
}

class EmployerService{

  constructor(models) {
    this.models = models;
  }

  async createEmployer(content) {
   
    let { fullName, email, phone, password, companyName, license } = content.input;
    
     email = email.trim().toLowerCase();

    const { employer } = this.models;
    
    //hashing the user password
    const hashed = await bcrypt.hash(password, 10);

    let licenseImageUri = '';

     let user = await employer.findOne({where:{email}});

     if(user){
          throw new ForbiddenError('Email has already been used, try again with another!');
     }
    
    //   //saving uploaded files to respective Folders
    // licenseImageUri = await getResult(license, LICENSE_FOLDER);
    let result = await AWS3Service.handleFileUpload(license);
    licenseImageUri = result.Location;  //let {Location:licenseImageUri} = result; best way of doing this.

    try {
       const Employer = await employer.create({
                                        fullName,
                                        companyName,
                                        email,
                                        phone,
                                        password:hashed,
                                        licenseImageUri
                                        });
       return Employer;                                     
    } catch (error) {
      throw new ForbiddenError('Phone number has already been used, try again!');  
    }
    
  }

  async signInEmployer(content) {
   
     let { email, password } = content.input;
    email = email.trim().toLowerCase();
    
    let user = await this.models.employer.findOne({ where: { email } });
    
       if(!user){
          throw new AuthenticationError('User account not found! try again');
       }
    
       //comparing the password with the hash stored in the database 
       let valid = await bcrypt.compare(password,user.password);
    
        if(!valid){
            throw new AuthenticationError(`Wrong password for this email, try again`)
          }

    return user;

  }
  
  async employer({user}) {

    if (!user) {
       throw new AuthenticationError('You should be signed!');
    }

    const { id } = user;
    return await this.models.employer.findOne({ where:{id} });

  }

 
  //employer creating their own profesion type
  async employeeCreateProfession(profession) {
   
     let result = await this.findProfessionByName(profession);
    
    if (result) {
      return result.dataValues.id;
     }else{
      const newProf = await this.models.profession.create({ name: profession });
      return newProf.dataValues.id;
     }
  }

  async findProfessionByName(name) {
   return await this.models.profession.findOne({ where: { name } });
  }


  async employerCreateGig({ input, user, pubsub }) {
    
    const {paymentMethod} = input;
    
    if (!user) {
       throw new AuthenticationError('You should be signed!');
    }

    try {
      if (input.professionId === OTHER_PROFESION) {
          let professionId =await this.employeeCreateProfession(input.other);
        input.professionId = professionId;
        console.log({ input });
          if (paymentMethod === PAY_BY_FULL_AMOUNT) {
          let gig = await this.models.gig.create({ ...input, paymentMethod: PAY_BY_FULL_AMOUNT, employerId: user.id });
          pubsub.publish('onGigCreated', { onGigCreated:gig.dataValues});
          return gig.dataValues;
        } else {
          let gig = await this.models.gig.create({ ...input, paymentMethod: PAY_BY_HOURLY_RATE, employerId: user.id });
          pubsub.publish('onGigCreated', { onGigCreated:gig.dataValues}); 
          return gig.dataValues;
      }

      } else { 
        
            if (paymentMethod === PAY_BY_FULL_AMOUNT) {
              let gig = await this.models.gig.create({ ...input, paymentMethod: PAY_BY_FULL_AMOUNT, employerId: user.id });
              pubsub.publish('onGigCreated', { onGigCreated:gig.dataValues});
              return gig.dataValues;
            } else {
              let gig = await this.models.gig.create({ ...input, paymentMethod: PAY_BY_HOURLY_RATE, employerId: user.id });
              pubsub.publish('onGigCreated', { onGigCreated:gig.dataValues}); 
              return gig.dataValues;
          } 

        }
       
    } catch (error) {
      throw new Error(error); 
    }

  }

    isAuthenticatic(user) {
   if(!user){
          throw new AuthenticationError('Account not found! register');
       }
  }

  async employerSendMessage({ content,employeeId, user, pubsub }) {
    this.isAuthenticatic(user);
    const message = await this.models.chat.create({content,employeeId,employerId:user.id});
    pubsub.publish('onEmployerSentMessage', { onEmployerSentMessage: message.dataValues });
    return message;
  }

  async getChats({user,employeeId}) {
    this.isAuthenticatic(user);
    return await this.models.chat.findAll({where:{employerId:user.id,employeeId},order: [['createdAt', 'DESC']]})
  }

  async updatePushToken({ user, pushToken }){
    
    this.isAuthenticatic(user);

    return await this.models.employer.update(
      { pushToken },
      { where: {id:user.id} }
    );
    
  }

  async getCreatedGigs({user}) {
    this.isAuthenticatic(user);
    let gig = await this.models.gig.findAll({ where: { employerId: user.id } });
    console.log({ gig });
    return gig;
  }

  async getCreatedGig({user}) {
    this.isAuthenticatic(user);
    return await this.models.gig.findOne({where:{employerId: user.id}})
  }



}

module.exports = EmployerService;


