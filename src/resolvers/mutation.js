const bcrypt = require('bcrypt'); //password increption module
const jwt = require('jsonwebtoken'); //json web token module
const fs = require('fs'); 
const path = require('path');
const {AuthenticationError,ForbiddenError,PubSub} = require('apollo-server-express');
const JWT_SECRETE = require('../utils/tokens');

const indexOne = 0
const indexTwo = 1
const indexThree = 2

const pubsub = new PubSub();

/**
 * This function is used to save a file strem onto the the system
 * @param {*stream object} stream of file to be renamed
 * @param {*filename String} filename
 * @param {*dirIndex Int}  dirIndex index to path where to store image
 * @returns 
 */
const storeFS =async ({ stream, filename },dirIndex) => {
    let dirs  = ['../uploads/profile-images/','../uploads/id-images/','../uploads/document-images'];
    const uploadDir = dirs[dirIndex];
    filename = `${Date.now()}-${filename.trim().toLowerCase() }`
    const fileName = path.join(__dirname,uploadDir,filename);

    return await new Promise((resolve, reject) =>
        stream.on('error', error => {
                if (stream.truncated) // delete the truncated file
                  fs.unlinkSync(fileName);
                  reject(error);
            })
            .pipe(fs.createWriteStream(fileName))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ filename }))
    );
}

/**
 * 
 * @param {*} uploadFile upload file object containing filename  mimetype encoding and createReadStream() function
 * @param {*} dirIndex  index to the folder locatoin where the image should be stored
 * @returns 
 */
const getResult =async (uploadFile,dirIndex) => {
  console.log({uploadFile,dirIndex});
   const {filename,createReadStream } =await  uploadFile;
    const stream = createReadStream();
    const result = await storeFS({ stream, filename },dirIndex);
    return result.filename;
}

module.exports = {

  test: (parent, { name }, context) => {
    pubsub.publish('TEST', { hasTested: `my name is ${name}` });
    return 'Some has checked in ';
  },
  createJobSeeker:async (parent,{input},{models}) => {
     
    let {fullName,email,phone,password,document,nationalId,professionIds} = input;

    console.log(input);
    
    email = email.trim().toLowerCase();

    //destructuring models to be used  i this file
    const {employee,employeeProfession} = models;

     //hashing the user password
    const hashed = await bcrypt.hash(password, 10);
    let  documentImageUri='';
    let nationalIdImageUri='';
    
     //saving uploaded files to respective Folders
     nationalIdImageUri = await getResult(nationalId,indexTwo);
     documentImageUri = await getResult(document,indexThree);

    try {
       const JobSeeker = await employee.create({
                                        fullName,
                                        email,
                                        phone,
                                        password:hashed,
                                        documentImageUri,
                                        nationalIdImageUri
                                        });

         const idsIterator = professionIds[Symbol.iterator]();
         
         for (const professionId of idsIterator) {
          await employeeProfession.create({professionId,employeeId:JobSeeker.id})
         }
         return jwt.sign({id: JobSeeker.id},JWT_SECRETE);
                                                      
    } catch (error) {
      console.error("Error occurred during the account creation ", error);
      console.log(error);
      throw new Error('Error occurred at account creation');
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
    
     let  {email,password} = input;

       email = email.trim().toLowerCase();

      let user = await models.employee.findOne({where:{email}});

       if(!user){
          throw new AuthenticationError('Error signing in');
       }

        //comparing the password with the hash stored in the database 
       let valid = await bcrypt.compare(password,user.password);

       if(!valid){
         throw new AuthenticationError('Error signing in')
       }
      //signing the user and returning the json web token
      return jwt.sign({id:user.id},JWT_SECRETE);
  },
  userUpdateStatus: async (parent, { status }, { models, user }) => {
    
       if (!user) {
            throw new AuthenticationError('You should be signed!');
       }
    const id = user.id;
   
    const data =  await models.employee.update(
      { status },
      { where: { id } }
    );
    
    console.log({ data });

    const allUsers = await models.employee.findAll({where:{status:1}});
     pubsub.publish('onStatusChange',{ onStatusChange: allUsers});
    const newUser = await models.employee.findOne({id})

    return newUser;
  
 }



}


