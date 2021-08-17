const {
  ForbiddenError
} = require("apollo-server-express");

const MAX_UPLOAD_FILE_SIZE = 1048576;

const AWS = require("aws-sdk");
// store each image in it's own unique folder to avoid name duplicates

const { v4: uuidv4 } = require("uuid");

// AWS config info
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_S3_REGION,
  bucket: process.env.AWS_S3_BUCKET
});

const s3 = new AWS.S3({ region: process.env.AWS_S3_REGION });

// my default params for s3 upload
// I have a max upload size of 1 MB
const s3DefaultParams = {
  ACL: "public-read",
  Bucket: process.env.AWS_S3_BUCKET,
  Conditions: [
    ["content-length-range", 0, 1024000], // 1 Mb
    { acl: "public-read" }
  ]
};

// the actual upload happens here
const handleFileUpload = async (file) => {
  const { createReadStream, filename } = await file;

  const _buffer = createReadStream();

  const streamSize = await findStreamSize(_buffer);

  if (streamSize > MAX_UPLOAD_FILE_SIZE) {
    throw new ForbiddenError("Uploaded file must not exceed 1 Mb");
  }

  const key = uuidv4();

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...s3DefaultParams,
        Body: createReadStream(),
        Key: `${key}/${filename}`
      },
      (err, data) => {
        if (err) {
          console.log("error uploading...", err);
          reject(err);
        } else {
          console.log("successfully uploaded file...", data);
          resolve(data);
        }
      }
    );
  });
};

const findStreamSize = (_buffer) => {
  const chunk = [];

  return new Promise((resolve, reject) =>
    _buffer
      .on("data", (data) => chunk.push(data))
      .on("end", () => {
        const buffer = Buffer.concat(chunk);
        resolve(buffer.length);
      })
      .on("error", (error) => reject(error))
  );
};

module.exports = { handleFileUpload };
