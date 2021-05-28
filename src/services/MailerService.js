const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});




class MailerService{
  
    sendMail(email) {
      
      const mailOptions = {
      from: 'raymondkalumba360@gmail.com',
      to: email,
      subject: 'The Gigs App updated password',
      text: 'You are requested to updated your password'
      };

      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error); 
        return error;
      } else {
          console.log('Email sent: ' + info.response);
          return "Email sent successfully"
      }
});

      
    
    }

}
module.exports = MailerService;