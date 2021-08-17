const jwt = require("jsonwebtoken");

/**
 *
 * @param {*} token static token used to autheticate the user
 * @returns
 */
const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRETE);
    } catch (error) {
      throw new Error("Invalid Session");
    }
  }
};

module.exports = getUser;
