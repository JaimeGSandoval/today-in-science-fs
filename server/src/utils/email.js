// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const AppError = require('./app-error');

const sendEmail = async (options) => {
  // KEEP TO SEND EMAILS WITH NODEMAILER FOR DEVELOPMENT
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: Number(process.env.EMAIL_PORT) || 0,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME, // mailtrap username
  //     pass: process.env.EMAIL_PASSWORD, // mailtrap password
  //   },
  // });
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const updateEmailHtml = `
  <p> Please click the button below to verify this new email and complete the update process. It will take you back to Today in Science and you will be required to log in again.\nIf you didn't request an email change please ignore this email.</p>\n<br/>
  <a href="${options.updateEmailUrl}" target="_blank">Verify Email</a>
  `;

  const msg = {
    to: options.newEmail, // Change to your recipient
    from: 'jaime.devs@gmail.com', // Change to your verified sender
    subject: 'Request for email change',
    html: updateEmailHtml,
  };

  try {
    // KEEP TO SEND EMAILS WITH NODEMAILER FOR DEVELOPMENT
    // await transporter.sendMail({
    //   from: 'tissupport@email.com', // sender address
    //   to: options.email, // list of receivers
    //   subject: 'Request for email change', // Subject line
    //   html: options.emailHtml, // message and link
    // });
    await sgMail.send(msg);
  } catch (e) {
    throw new AppError(e.message, 500);
  }
};

module.exports = {
  sendEmail,
};
