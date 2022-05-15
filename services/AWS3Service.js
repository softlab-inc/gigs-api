// the actual upload happens here
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const handleFileUpload = async (file) => {
  const { createReadStream, filename } = await file;

  const stream = createReadStream();
  const root = path.resolve("./assets");
  const filePath = path.join(root, filename);
  const out = fs.createWriteStream(filePath);
  stream.pipe(out);
  const data = new FormData();
  data.append("image", fs.createReadStream(filePath));
  axios
    .post(
      "https://api.imgbb.com/1/upload?expiration=600&key=c0bd7f3650e117098dbb225c2990c0dd",
      { ...data },
      {
        headers: data.getHeaders(),
      }
    )
    .then((response) => {
      console.log({ response });
      return "success...";
    })
    .catch((error) => {
      if (error.response) {
        console.log("response", error.response);
        //do something
      } else if (error.request) {
        console.log("request", error.request);
        //do something else
      } else if (error.message) {
        //do something other than the other two
        console.log("message", error.request);
      }
      return "error...";
    });
};

module.exports = { handleFileUpload };
