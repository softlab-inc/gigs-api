const nodemailer = require('nodemailer');


class MailerService{
  
   async sendMail({email,id}) {
     
     try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'SendinBlue',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      }
    });
       
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAILER_USER,// sender address
      to: email, // list of receivers
      subject: "Forgot password", // Subject line
      text: "Use this  to update your password", // plain text body
      html: `
      <html>
        <body>
        <h5> <i>Click</i> the  link in the description to updated your password </h5>
        
        <a href="http://page-not-created/?id=${id}">This link will redirect you to a web page where you are required to update your password from</a>
      </body>
    </html>
      
      `, // html body
    });
        return info.messageId;
     } catch (error) {
       console.error(error);
       throw new Error (`${error}`)
     }
     
    }

}
module.exports = MailerService;