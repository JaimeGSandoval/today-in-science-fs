const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');
const AppError = require('./app-error');

const sendEmail = async (options) => {
  // KEEP TO SEND EMAILS WITH NODEMAILER FOR DEVELOPMENT
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 0,
    auth: {
      user: process.env.EMAIL_USERNAME, // mailtrap username
      pass: process.env.EMAIL_PASSWORD, // mailtrap password
    },
  });
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // const msg = {
  //   to: options.newEmail ? options.newEmail : options.userEmail, // Change to your recipient
  //   from: 'jaime.devs@gmail.com', // Change to your verified sender
  //   subject: 'Request for email change',
  //   html: options.updateEmailHtml ? options.updateEmailHtml : options.updatePasswordHtml,
  // };

  try {
    // KEEP TO SEND EMAILS WITH NODEMAILER FOR DEVELOPMENT
    await transporter.sendMail({
      from: 'tissupport@email.com', // sender address
      to: options.newEmail ? options.newEmail : options.userEmail, // list of receivers
      subject: 'Request for password change', // Subject line
      html: options.updateEmailHtml ? options.updateEmailHtml : options.updatePasswordHtml, // message and link
    });
    // await sgMail.send(msg);
  } catch (e) {
    throw new AppError(e.message, 500);
  }
};

module.exports = {
  sendEmail,
};
