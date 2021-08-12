const nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)


class MailerService{


  const msg = {
  to: email, // Change to your recipient
  from: process.env.SENDER_EMAIL, // Change to your verified sender
  subject:"Forgot password",
  text: "Use this  to update your password",
  html: `
          <html>
        <body>
        <h5> <i>Click</i> the  link in the description to updated your password </h5>
        
        <a href="https://gigs-app-forgot-password.herokuapp.com/?id=${id}&isEmployer=${isEmployer}">This link will redirect you to a web page where you are required to update your password from</a>
      </body>
    </html>
  `,
}



  
  //  async sendMail({email,id,isEmployer}) {
   
   
   
   
       
     
  //    try {
  //   // create reusable transporter object using the default SMTP transport
  //   const transporter = nodemailer.createTransport({
  //   host: 'SendinBlue',
  //   port: 465,
  //   secure: true,
  //    auth: {
  //       user: process.env.MAILER_USER,
  //       pass: process.env.MAILER_PASSWORD
  //     },
  //   tls: {
  //     ciphers : 'SSLv3',
  //   },
  //   });
       
  //     //  console.log({  auth: {
  //     //   user: process.env.MAILER_USER,
  //     //   pass: process.env.MAILER_PASSWORD
  //     // }})
  
  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({ 
  //     from: process.env.MAILER_USER,// sender address
  //     to: email, // list of receivers
  //     subject: "Forgot password", // Subject line
  //     text: "Use this  to update your password", // plain text body
  //     html: `
  //     <html>
  //       <body>
  //       <h5> <i>Click</i> the  link in the description to updated your password </h5>
        
  //       <a href="https://gigs-app-forgot-password.herokuapp.com/?id=${id}&isEmployer=${isEmployer}">This link will redirect you to a web page where you are required to update your password from</a>
  //     </body>
  //   </html>
  //     `, // html body
  //   });
  //       return info.messageId;
  //    } catch (error) {
  //      console.error({error});
  //      throw new Error(`${error}`); 
  //    }
     
  //   }
    
    
    
    
    

}
module.exports = MailerService;