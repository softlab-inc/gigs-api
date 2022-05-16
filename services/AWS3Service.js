const axios = require("axios");
const FormData = require("form-data");

const handleFileUpload = async (file) => {
  const { createReadStream, filename } = await file;
  const url =
    "https://api.imgbb.com/1/upload?key=c0bd7f3650e117098dbb225c2990c0dd";

  const stream = createReadStream();

  const form = new FormData();
  form.append("image", stream, filename);

  try {
    const response = await axios.post(url, form, {
      headers: { ...form.getHeaders() },
    });
    return { Location: response.data.data.display_url };
  } catch (error) {
    console.log({ ...error });
    return { ...error };
  }
};

module.exports = { handleFileUpload };

//Image manipulation with node-modules
//----------------------------------------------------------------
// const filePath = path.join(path.resolve("./assets"), filename);
// const ws = fs.createWriteStream(filePath);
// stream.pipe(ws);
// stream.on("finish", (data) => {
//   console.log({ data, message: "complete stream" });
// });
// const rs = fs.createReadStream(filePath);
