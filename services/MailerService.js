const sgMail = require("@sendgrid/mail");

class MailerService {
  async sendMail({ email, id, isEmployer }) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: process.env.SENDER_EMAIL, // Change to your verified sender
      subject: "Forgot password",
      text: "Use this  to update your password",
      html: `
                  <html>
                <body>
                <h5> <i>Click</i> the  link in the description to updated your password </h5>
                
                <a href="https://gigs-app-forgot-password.herokuapp.com/?id=${id}&isEmployer=${isEmployer}">This link will redirect you to a web page where you are required to update your password from</a>
              </body>
            </html>
          `,
    };

    try {
      await sgMail.send(msg);
      return "Password has been verified successfully";
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async sendMailToAny({mail,message,subject}){

  }
  
}


module.exports = MailerService;
