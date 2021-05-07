const fs = require('fs'); 
const path = require('path');


/**
 * This function is used to save a file strem onto the the system
 * @param {*stream object} stream of file to be renamed
 * @param {*filename String} filename
 * @param {*dirIndex Int}  dirIndex index to path where to store image
 * @returns 
 */
const storeFS =async ({ stream, filename },dirIndex) => {
    let dirs  = ['../uploads/profile-images/','../uploads/id-images/','../uploads/document-images/','../uploads/license-images/'];
    const uploadDir = dirs[dirIndex];
    filename = `${Date.now()}-${filename.trim().toLowerCase() }`
    const fileName = path.join(__dirname,uploadDir,filename);

    return await new Promise((resolve, reject) =>
        stream.on('error', error => {
            console.log('Error ocurred')
            console.log(error)
                if (stream.truncated) // delete the truncated file
                  fs.unlinkSync(fileName);
                  reject(error);
            })
            .pipe(fs.createWriteStream(fileName))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ filename }))
    );
}

module.exports = storeFS;