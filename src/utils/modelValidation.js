


function constomValidationError(e) {
  const messages = {};
  if (e instanceof SequelizeUniqueConstraintError) {
    e.errors.forEach((error) => {
      let message;
      switch (error.validatorKey) {
        case 'isEmail':
          message = 'Please enter a valid email';
          break;
        case 'isDate':
          message = 'Please enter a valid date';
          break;
        case 'len':
          if (error.validatorArgs[0] === error.validatorArgs[1]) {
            message = 'Use ' + error.validatorArgs[0] + ' characters';
          } else {
            message = 'Use between ' + error.validatorArgs[0] + ' and ' + error.validatorArgs[1] + ' characters';
          }
          break;
        case 'min':
          message = 'Use a number greater or equal to ' + error.validatorArgs[0];
          break;
        case 'max':
          message = 'Use a number less or equal to ' + error.validatorArgs[0];
          break;
        case 'isInt':
          message = 'Please use an integer number';
          break;
        case 'is_null':
          message = 'Please complete this field';
          break;
        case 'not_unique':
          message = error.value + ' is taken. Please choose another one';
          error.path = error.path.replace("_UNIQUE", "");
      }
      messages[error.path] = message;
    });
  }
}

module.exports = constomValidationError;


const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.JWT_SECRETE);

const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); // e7b75a472b65bc4a42e7b3f78833a4d00040beba796062bf7c13d9533b149e5ec3784813dc20348fdf248d28a2982df85b83d1109623bce45f08238f6ea9bd9bb5f406427b2a40f969802635b8907a0a57944f2c12f334bd081d5143a357c173a611e1b64aconsole.log(decryptedString); // bacon