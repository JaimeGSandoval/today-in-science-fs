const settingsModel = require('../models/settings.model');
const usersModel = require('../models/users.model');
const AppError = require('../utils/app-error');
const { signJWT, verifyJWT } = require('../utils/jwt.utils');
const { sendEmail } = require('../utils/email');
const { encryptPassword } = require('../utils/bcrypt.utils');

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

    const token = signJWT(updateData, process.env.ACCESS_TOKEN_SECRET, 240);

    const updateEmailUrl = `${req.protocol}://${req.get('host')}/settings/update-email/${token}`;

    const updateEmailHtml = `
  <p> Please click the button below to verify this new email and complete the update process. It will take you back to Today in Science and you will be required to log in again.\nIf you didn't request an email change please ignore this email.</p>\n<br/>
  <a href="${updateEmailUrl}" target="_blank">Verify Email</a>
  `;

    const emailOptions = {
      newEmail,
      updateEmailHtml,
      subject: 'Request for email update',
    };

    await sendEmail(emailOptions);

    return res.status(200).json({
      status: 'Success',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const httpUpdateUserEmail = async (req, res, next) => {
  const { token } = req.params;

  const { decoded } = verifyJWT(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) {
    return next(new AppError('Unauthorized. Invalid token.', 401));
  }

  const { newEmail, userId } = decoded;

  try {
    await settingsModel.updateUserEmail(parseInt(userId, 10), newEmail);

    // how to destroy or delete session in DB? Can I get sessionID somehow and put it in the token too?

    // just using send for now. when the frontend gets a status code of 204 then I'll redirect the user to login page with react router
    res.send('User email updated. A new login is required. Redirecting to login page.');
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const httpUpdatePasswordRequest = async (req, res, next) => {
  const { userId } = req.params;
  const { userEmail, newPassword, updateType } = req.body;

  try {
    const user = await usersModel.getUserByEmail(userEmail);

    if (!user.rows.length) {
      return next(new AppError('There is no account with that email.', 409));
    }

    const updateData = {
      userId: userId ? Number(userId) : user.rows[0].user_id,
      userEmail,
      newPassword: newPassword || null,
      updateType,
    };

    const token = signJWT(updateData, process.env.ACCESS_TOKEN_SECRET, 240);

    const updatePasswordUrl = `${req.protocol}://${req.get(
      'host'
    )}/settings/update-password/${token}`;

    const updatePasswordHtml = `
    <p> Please click the button below to verify this email and complete the update process. It will take you back to Today in Science and you can then update your password.\nIf you didn't request an password change please ignore this email.</p>\n<br/>
    <a href="${updatePasswordUrl}" target="_blank">Update password</a>
    `;

    const emailOptions = {
      userEmail,
      updatePasswordHtml,
      subject: 'Request for password change',
    };

    await sendEmail(emailOptions);

    return res.status(200).json({
      status: 'Success',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const httpUpdateUserPassword = async (req, res, next) => {
  const { token } = req.params;

  const { decoded } = verifyJWT(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) {
    return next(new AppError('Unauthorized. Invalid token.', 401));
  }

  const { newPassword, userId, updateType } = decoded;

  if (updateType === 'forgot') {
    return res.send('Token validated. Redirect user to FE update password form');
  }

  try {
    const encryptedPassword = await encryptPassword(newPassword);
    await settingsModel.updateUserPassword(encryptedPassword, parseInt(userId, 10));

    // how to destroy or delete session in DB? Can I get sessionID somehow and put it in the token too?

    // just using send for now. when the frontend gets a status code of 204 then I'll redirect the user to login page with react router
    res.send('User password updated. A new login is required. Redirecting to login page.');
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

module.exports = {
  httpUpdateUsername,
  httpUpdateEmailRequest,
  httpUpdateUserEmail,
  httpUpdatePasswordRequest,
  httpUpdateUserPassword,
};
