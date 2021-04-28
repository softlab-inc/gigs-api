const bcrypt = require('bcrypt'); //password encryption module
const storeFS = require('../utils/storeFS');

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
  console.log({uploadFile,dirIndex});
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
    let { fullName, email, phone, password, document, nationalId, professionIds } = content.input;
    
     email = email.trim().toLowerCase();

    const { employee, employeeProfession } = this.models;
  
    //hashing the user password
    const hashed = await bcrypt.hash(password, 10);
    let  documentImageUri='';
    let nationalIdImageUri = '';
    

   

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
       
        //saving uploaded files to respective Folders
        nationalIdImageUri = await getResult(nationalId,IDS_FOLDER);
        documentImageUri = await getResult(document,DOCS_FOLDER);
       
       return JobSeeker;                                     
    } catch (error) {
      throw new Error(error);
    }


  }







  

}

module.exports = JobSeekerSerivce;


