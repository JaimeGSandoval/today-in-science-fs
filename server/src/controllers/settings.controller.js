const settingsModel = require('../models/setttings.modal');
const usersModel = require('../models/users.model');
const AppError = require('../utils/app-error');

module.exports = {
  httpUpdateUsername: async (req, res, next) => {
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
  },
};
