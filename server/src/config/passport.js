const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('../models/users.model');
const { comparePasswords } = require('../utils/bcrypt.utils');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, candidatePassword, done) => {
        try {
          const storedPassword = await usersModel.getUserPassword(email);

          if (!storedPassword.rows.length) {
            return done(null, false, { message: 'No user found' });
          }

          const { password } = storedPassword.rows[0];

          if (await comparePasswords(candidatePassword, password)) {
            const user = await usersModel.getUserByEmail(email);
            done(null, user.rows[0]);
          } else {
            done(null, false, { message: 'Incorrect password' });
          }
        } catch (e) {
          done(e);
        }
      }
    )
  );

  // attach to session
  passport.serializeUser((user, done) => done(null, user));

  // attach to req.user
  passport.deserializeUser((user, done) => done(null, user));
};
