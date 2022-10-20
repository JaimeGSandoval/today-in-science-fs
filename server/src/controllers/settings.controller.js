const settingsModel = require('../models/setttings.modal');
const usersModel = require('../models/users.model');
const AppError = require('../utils/app-error');
const { signJWT } = require('../utils/jwt.utils');
const { sendEmail } = require('../utils/email');

const httpUpdateUsername = async (req, res, next) => {
  const { userId } = req.params;
  const { newUsername } = req.body;

  try {
    const userNameExists = await usersModel.getUsername(newUsername);

    if (userNameExists.rows.length) {
      return next(new AppError('That username is already taken.', 409));
    }

    const userUpdated = await settingsModel.updateUsername(newUsername, parseInt(userId, 10));

    req.session.passport.user.user_name = userUpdated.rows[0].user_name;

    const { user } = req.session.passport;

    req.login(user, (err) => {
      if (err) {
        return next(new AppError('There was a problem updating your username', 500));
      }

      res.sendStatus(204);
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const httpUpdateEmailRequest = async (req, res, next) => {
  const { userId } = req.params;
  const { newEmail } = req.body;

  try {
    const emailExists = await usersModel.getUserByEmail(newEmail);

    if (emailExists.rows.length) {
      return next(new AppError('An account with that email already exists.', 409));
    }

    const updateData = {
      userId: Number(userId),
      newEmail,
    };

    const token = signJWT(updateData, process.env.ACCESS_TOKEN_SECRET, 260);

    const updateEmailUrl = `${req.protocol}://${req.get('host')}/settings/update-email/${token}`;

    const emailHtml = `
    <p>Thank for for verifying this new email. Please click the link below to complete the update process.\nIf you didn't forget your password please ignore this email.</p>\n<br/>
    <a href="${updateEmailUrl}" target="_blank">Click me</a>
    `;

    const emailOptions = {
      email: newEmail,
      subject: 'Request for email change',
      emailHtml,
    };

    await sendEmail(emailOptions);

    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });

    return res.status(200).json({
      status: 'Success',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

module.exports = {
  httpUpdateUsername,
  httpUpdateEmailRequest,
};
