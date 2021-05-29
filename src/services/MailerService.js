const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});







class MailerService{
  
   async sendMail(email) {
     
     try {
        // async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
      

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      }
    });
       
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAILER_USER, // sender address
      to: email, // list of receivers
      subject: "Forgot password", // Subject line
      text: "Use link in the description to updated your password", // plain text body
      html: "<b>You have forgotten your account?</b>", // html body
    });
        return info.messageId;
     } catch (error) {
       console.error(`Error occured ${error}`)
        return error;
     }
     
    }

}
module.exports = MailerService;