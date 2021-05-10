const bcrypt = require('bcrypt'); //password encryption module
const storeFS = require('../utils/storeFS');

const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const LICENSE_FOLDER = 3

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

     let user = await this.models.employer.findOne({where:{email}});

     if(user){
          throw new AuthenticationError('Email was already used try again');
     }
    
      //saving uploaded files to respective Folders
      licenseImageUri = await getResult(license,LICENSE_FOLDER);

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
      throw new Error(error);  
    }
    
  }

  async signInEmployer(content) {
   
     let { email, password } = content.input;
      email = email.trim().toLowerCase();
     let user = await this.models.employer.findOne({where:{email}});
     console.log({user})
       if(!user){
          throw new AuthenticationError('User account not found! try again');
       }
    
       //comparing the password with the hash stored in the database 
       let valid = await bcrypt.compare(password,user.password);
    
        if(!valid){
            throw new AuthenticationError('Email or password is wrong! try again')
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


  async employerCreateGig({ input, user, pubsub }) {
    
    if (!user) {
       throw new AuthenticationError('You should be signed!');
    }
    try {
          pubsub.publish('onGigCreated', { onGigCreated: {id:1,...input,employerId:user.id,paymentMethod:1,status:0} });
      return  {id:1,...input,employerId:user.id,paymentMethod:1,status:0}
    } catch (error) {
    throw new Error(error)
    }

  }



  

}

module.exports = EmployerService;


