const bcrypt = require('bcrypt'); //password encryption module
const storeFS = require('../utils/storeFS');

const {AuthenticationError,ForbiddenError} = require('apollo-server-express');

const PROFILE_FOLDER = 0
const IDS_FOLDER = 1
const DOCS_FOLDER = 2

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


class JobSeekerSerivce{

  constructor(models) {
      this.models = models;
   }

  async createJobSeeker(content) {
    let { fullName, email, phone, password, document, nationalId, professionId, other } = content.input;
    
     email = email.trim().toLowerCase();

    const { employee, employeeProfession,profession } = this.models;
  
    //hashing the user password
    const hashed = await bcrypt.hash(password, 10);
    let  documentImageUri='';
    let nationalIdImageUri = '';
      
      let user = await this.models.employee.findOne({where:{email}});

       if(user){
          throw new ForbiddenError('Email was already used, try again');
       }
    
      //saving uploaded files to respective Folders
      nationalIdImageUri = await getResult(nationalId,IDS_FOLDER);
      documentImageUri = await getResult(document,DOCS_FOLDER);
      
     try {
       const JobSeeker = await employee.create({
                                        fullName,
                                        email,
                                        phone,
                                        password:hashed,
                                        documentImageUri,
                                        nationalIdImageUri
                                        });

       //if they never specified a profession
       if (other) { 
         let newProfession = await profession.create({ name: other });
         await employeeProfession.create({ professionId: newProfession.id, employeeId: JobSeeker.id });
       } else {
         await employeeProfession.create({ professionId, employeeId: JobSeeker.id });
       }
       return JobSeeker;                                     
    } catch (error) {
      throw new Error(error);
    }

  }

  async getNotifications({ employeeId}) {
    const {gig,notified,} = this.models;
    let data = await notified.findAll({where:{employeeId}, include: [gig] });
    return data.map(data => data.get('gig'));
  }

  async getProfessions({ employeeId }) {
     const {employeeProfession,profession } = this.models;
    let data = await employeeProfession.findAll({where:{employeeId}, include: [profession] });
    return data.map(data => data.get('profession'));
  }

  async signInJobSeeker(content) {
  
    let { email, password } = content.input;
      email = email.trim().toLowerCase();
     let user = await this.models.employee.findOne({where:{email}});

       if(!user){
          throw new AuthenticationError('Account not found! register');
       }
    
       //comparing the password with the hash stored in the database 
       let valid = await bcrypt.compare(password,user.password);
    
        if(!valid){
            throw new AuthenticationError('Incorrrect password! try gain')
          }

    return user;

  }
  
  async userUpdateStatus({ status, user, pubsub }) {
    
    if (!user) {
       throw new AuthenticationError('You should be signed!');
    }
    
        const id = user.id;
      
         await this.models.employee.update(
            { status },
            { where: { id } }
          );
    
         const newUser = await this.models.employee.findOne({ where: { id } });
    
         pubsub.publish('onStatusChange', { onStatusChange: newUser });

    return newUser;
  
  }
 
  async uploadProfileImage({ user, profileImage }) {

  if (!user) {
       throw new AuthenticationError('You should be signed!');
  }
    
      const id = user.id;

    let profileImagUri = '';
    profileImagUri = await getResult(profileImage, PROFILE_FOLDER);
    
    await this.models.employee.update({ profileImagUri }, { where: { id} });
    return profileImagUri;
  }
  
  async jobSeeker({user}) {
    
    if (!user) {
       throw new AuthenticationError('You should be signed!');
    }
    
    const { id } = user;
    return await this.models.employee.findOne({ where:{id} });

  }
 
}

module.exports = JobSeekerSerivce;


