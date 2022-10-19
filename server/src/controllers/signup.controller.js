const { encryptPassword } = require('../utils/bcrypt.utils');
const AppError = require('../utils/app-error');
const signupModel = require('../models/signup.modal');
const usersModel = require('../models/users.model');

const httpSignupUser = async (req, res, next) => {
  const { userName, email, password, passwordConfirm, role } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('Password does not match password confirm.', 400));
  }

  try {
    const userExists = await signupModel.getUserEmail(email);

    if (userExists.rows.length) {
      return next(new AppError('You have already registered. Would you like to login?', 409));
    }

    const userNameUnavailable = await usersModel.getUsername(userName);

    if (userNameUnavailable.rows.length) {
      return next(new AppError('That user name is already taken.', 409));
    }

    const encryptedPassword = await encryptPassword(password);
    const newUser = await signupModel.signupUser(userName, email, encryptedPassword, role);

    return res.status(201).json({
      status: 'Success',
      data: {
        newUser: newUser.rows[0],
      },
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  httpSignupUser,
};
