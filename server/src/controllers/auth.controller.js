const passport = require('passport');
const AppError = require('../utils/app-error');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      req.logIn(user, (error) => {
        if (error) {
          return next(new AppError('There was an error logging in. Please try again.'), 500);
        }

        res.status(200).send(`User ${req.user.user_name} logged in successfully`);
      });
    } else {
      res.status(400).json(info);
    }
  })(req, res, next);
};
