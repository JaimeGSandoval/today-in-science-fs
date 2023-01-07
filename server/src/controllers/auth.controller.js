const passport = require('passport');
const AppError = require('../utils/app-error');

exports.getLogin = (req, res) => {
  res.redirect('/auth/login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      req.logIn(user, (error) => {
        if (error) {
          return next(new AppError('There was an error logging in. Please try again.'), 500);
        }

        return res.status(200).json({
          status: 'Success',
          message: `User ${user.user_name} logged in successfully`,
          data: {
            user,
          },
        });
      });
    } else {
      return res.status(400).json(info);
    }
  })(req, res, next);
};

exports.logout = async (req, res, next) => {
  if (!req.user) {
    return res.status(400).send('User in not logged in');
  }

  req.logOut((err) => {
    if (err) {
      return next(new AppError(err, 500));
    }
  });

  res.clearCookie('connect.sid');

  req.session.destroy((err) => {
    if (err) {
      return next(new AppError('Error : Failed to destroy the session during logout.', err));
    }

    res.sendStatus(204);
  });
};
