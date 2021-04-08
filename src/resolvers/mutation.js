
const fs = require('fs');
const path = require('path');
const {AuthenticationError} = require('apollo-server-express')

/**
 * 
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

module.exports = {
  test:(parent,{name},context)=>  `my name is is ${name} 💡`,
}



  



