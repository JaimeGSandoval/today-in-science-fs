const passport = require('passport');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // req.flash('errors', info);
      return res.status(400).send('no user');
    }

    req.logIn(user, (loginErr) => {
      if (err) {
        return next(loginErr);
      }

      // req.flash('success', { msg: 'Success! You are logged in.' });
      // res.redirect(req.session.returnTo || '/profile');

      res.status(200).send('User logged in successfully');
    });
  })(req, res, next);
};
