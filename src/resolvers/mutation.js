
const bcrypt = require('bcrypt'); //password increption module
const jwt = require('jsonwebtoken'); //json web token module
const fs = require('fs'); 
const path = require('path');
const {AuthenticationError,ForbiddenError} = require('apollo-server-express')


/**
 * This function is used to save a file strem onto the the system
 * @param {*stream object} name of file to be renamed
 * @returns 
 */

const storeFS =async ({ stream, filename }) => {
    const uploadDir = '../uploads/profile-photos/';
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

const getResult =async (uploadFile) => {
   const {filename,createReadStream } =  uploadFile;
    const stream = createReadStream();
    const result = await storeFS({ stream, filename });
    return result.filename;
}


module.exports = {
  test:(parent,{name},context)=>  `my name is is ${name} 💡`,
  createJobSeeker:async (parent,args,{fullName,bio,email,phone,profileImage,documents,nationalId,professionIds}) => {
  
     const profileImageUri = '',documentImageUri=''
     profileImageUri = await getResult(profileImage);
     documentImageUri = await getResult(documents);
     
     

  }
}



  



