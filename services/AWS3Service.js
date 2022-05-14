const { v4: uuidv4 } = require('uuid');

// the actual upload happens here
const handleFileUpload = async (file) => {
  const { createReadStream, filename } = await file;

  // const _buffer = createReadStream();

  // const streamSize = await findStreamSize(_buffer);

  // if (streamSize > MAX_UPLOAD_FILE_SIZE) {
  //   throw new ForbiddenError("Uploaded file must not exceed 1 Mb");
  // }

  const key = uuidv4();

  return key;
};

// const findStreamSize = (_buffer) => {
//   const chunk = [];

//   return new Promise((resolve, reject) =>
//     _buffer
//       .on("data", (data) => chunk.push(data))
//       .on("end", () => {
//         const buffer = Buffer.concat(chunk);
//         resolve(buffer.length);
//       })
//       .on("error", (error) => reject(error))
//   );
// };

module.exports = { handleFileUpload };
