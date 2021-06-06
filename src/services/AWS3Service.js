const AWS = require('aws-sdk');
// store each image in it's own unique folder to avoid name duplicates

const { v4: uuidv4 } = require('uuid');

// console.log(`${process.env.AWS_ACCESS_KEY_ID} ${process.env.AWS_ACCESS_KEY_SECRET} ${process.env.AWS_S3_REGION } ${process.env.AWS_S3_BUCKET}`)

//AWS config info
 AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_S3_REGION,
  bucket:process.env.AWS_S3_BUCKET,
 });


const s3 = new AWS.S3({ region: process.env.AWS_S3_REGION});
 

// my default params for s3 upload
// I have a max upload size of 1 MB
const s3DefaultParams = {
  ACL: 'public-read',
  Bucket: process.env.AWS_S3_BUCKET,
  Conditions: [
    ['content-length-range', 0, 1024000], // 1 Mb
    { acl: 'public-read' },
  ],
};


// the actual upload happens here
const handleFileUpload = async file => {
  const { createReadStream, filename } = await file;

  const key = uuidv4();

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...s3DefaultParams,
        Body: createReadStream(),
        Key: `${key}/${filename}`,
      },
      (err, data) => {
        if (err) {
          console.log('error uploading...', err);
          reject(err);
        } else {
          console.log('successfully uploaded file...', data);
          resolve(data);
        }
      },
    );
  });
};


module.exports = {handleFileUpload}


