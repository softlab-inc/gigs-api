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
       
       console.log({
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAILER_USER, // sender address
      to: email, // list of receivers
      subject: "Forgot password", // Subject line
      text: "Use link in the description to updated your password", // plain text body
      html: "<b>You have forgotten your account?</b>", // html body
    });
       console.log({ info });
       
    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        return info.messageId;
     } catch (error) {
      
       console.error(`Error occured ${error}`)
        return error;
     }
     
    }

}
module.exports = MailerService;