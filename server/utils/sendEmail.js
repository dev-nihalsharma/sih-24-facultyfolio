const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodeMailer.createTransport({
  host: process.env.EMAIL_HOST,
  port:process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: to,               
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = sendEmail;