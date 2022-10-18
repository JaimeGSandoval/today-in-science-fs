const nodemailer = require('nodemailer');
const AppError = require('./app-error');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 0,
    auth: {
      user: process.env.EMAIL_USERNAME, // mailtrap username
      pass: process.env.EMAIL_PASSWORD, // mailtrap password
    },
  });

  try {
    await transporter.sendMail({
      from: 'tissupport@email.com', // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      html: options.emailHtml, // message and link
    });
  } catch (e) {
    throw new AppError(e.message, 500);
  }
};

export default sendEmail;
