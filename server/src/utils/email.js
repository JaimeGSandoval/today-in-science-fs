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

  // options.newEmail ? options.newEmail : options.userEmail
  const msg = {
    to: options.newEmail ? options.newEmail : options.userEmail, // Change to your recipient
    from: 'jsdev.projects@gmail.com', // Change to your verified sender
    subject: options.subject,
    html: options.updateEmailHtml ? options.updateEmailHtml : options.updatePasswordHtml,
  };

  try {
    // KEEP TO SEND EMAILS WITH NODEMAILER FOR DEVELOPMENT
    // await transporter.sendMail({
    //   from: 'tissupport@email.com', // sender address
    //   to: options.newEmail ? options.newEmail : options.userEmail, // list of receivers
    //   subject: options.subject, // Subject line
    //   html: options.updateEmailHtml ? options.updateEmailHtml : options.updatePasswordHtml, // message and link
    // });

    await sgMail.send(msg);
  } catch (e) {
    console.log('from email');
    throw new AppError(e.message, 500);
  }
};

module.exports = {
  sendEmail,
};
