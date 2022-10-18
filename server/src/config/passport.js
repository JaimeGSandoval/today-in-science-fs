const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('../models/users.model');
const { comparePasswords } = require('../utils/bcrypt.utils');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const authenticatedUser = await usersModel.getUserByEmail(email);

        if (!authenticatedUser.rows.length) return done(null, false);

        const storedPassword = authenticatedUser.rows[0].password;

        if (await comparePasswords(password, storedPassword)) {
          done(null, authenticatedUser.rows[0]);
        } else {
          done(null, false);
        }
      } catch (e) {
        done(e);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersModel.getUserById(id);
      done(null, user.rows[0]);
    } catch (e) {
      done(e);
    }
  });
};
