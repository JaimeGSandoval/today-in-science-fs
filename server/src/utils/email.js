const sgMail = require('@sendgrid/mail');
const AppError = require('./app-error');

const sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: options.newEmail ? options.newEmail : options.userEmail, // Change to your recipient
    from: 'jsdev.projects@gmail.com', // Change to your verified sender
    subject: options.subject,
    html: options.updateEmailHtml ? options.updateEmailHtml : options.updatePasswordHtml,
  };

  try {
    await sgMail.send(msg);
  } catch (e) {
    console.log('from email');
    throw new AppError(e.message, 500);
  }
};

module.exports = {
  sendEmail,
};
