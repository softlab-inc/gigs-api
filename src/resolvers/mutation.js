const bcrypt = require('bcrypt'); //password increption module
const jwt = require('jsonwebtoken'); //json web token module
const fs = require('fs'); 
const path = require('path');
const {AuthenticationError,ForbiddenError} = require('apollo-server-express');
const JWT_SECRETE = require('../utils/tokens');


const indexOne = 0
const indexTwo = 1
const indexThree = 2

/**
 * This function is used to save a file strem onto the the system
 * @param {*stream object} stream of file to be renamed
 * @param {*filename String} filename
 * @param {*dirIndex Int}  dirIndex index to path where to store image
 * @returns 
 */
const storeFS =async ({ stream, filename },dirIndex) => {
    let dirs  = ['../uploads/profile-images/','../uploads/id-images/','../uploads/document-images'];
    const uploadDir = dirs[dirIndex] ;
    filename = `${Date.now()}-${filename.toLowerCase() }`
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

const getResult =async (uploadFile,dirIndex) => {
   const {filename,createReadStream } =  uploadFile;
    const stream = createReadStream();
    const result = await storeFS({ stream, filename },dirIndex);
    return result.filename;
}



module.exports = {
  test:(parent,{name},context)=>  `my name is is ${name} 💡`,
  createJobSeeker:async (parent,{input},{models}) => {
     
    const {fullName,bio,email,phone,document,nationalId,professionIds} = input;

    console.log(input);

    // email = email.trip().toLowerCase();

    // //destructuring models to be used  i this file
    //  const {employee,employeeProfession} = models;
    
    //  //hashing the user password
    //  const hashed = await bcrypt.hash(password, 10);
    //  const documentImageUri='',nationalIdImageUri='';
    
    //  //saving uploaded files to respective Folders
    //  nationalIdUri = await getResult(nationalId,indexTwo);
    //  documentImageUri = await getResult(documents,indexThree);
     
    // try {
    //    const JobSeeker = await employee.create({fullName,
    //                                     email,
    //                                     phone,
    //                                     password:hashed,
    //                                     document:documentImageUri,
    //                                     nationalId:nationalIdUri
    //                                     });
        
    //      const idsIterator = professionIds[Symbol.iterator]();
         
    //      for (const professionId of idsIterator) {
    //       await employeeProfession.create({professionId,employeeId:JobSeeker.id})
    //      }

    //      return jwt.sign({id: JobSeeker.id},JWT_SECRETE);

    return 'Testing create JobSeeker'
                                                      
    // } catch (error) {
    //   console.error("Error occurred during the account creation ", error);
    //   console.log(error);
    //   throw new Error('Error occurred at account creation');
    // }

  },
createProfession:async (parent,{input},{models}) => {
     
    const  nameArr =   input.names.map(name => ({name}));

    try {
      await models.profession.bulkCreate(nameArr);
       return 'Professions created successfully'
    } catch (error) {
      throw new Error(`Duplicated professoin ${error}`)
    }
       
  }



}

