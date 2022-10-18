// const LocalStrategy = require('passport-local');
// const { getUserByEmail } = require('../models/login/login.model');
// const { getUserById } = require('../models/users/users.model');
// const { comparePasswords } = require('../utils/bcrypt.utils');

// const authUser = async (email, password, done) => {
//   try {
//     const authenticatedUser = await getUserByEmail(email);

//     if (!authenticatedUser.rows.length) return done(null, false);

//     const storedPassword = authenticatedUser.rows[0].password;

//     if (await comparePasswords(password, storedPassword)) {
//       done(null, authenticatedUser.rows[0]);
//     } else {
//       done(null, false);
//     }
//   } catch (e) {
//     done(e);
//   }
// };

// const initializePassport = (passport) => {
//   passport.use(new LocalStrategy({ usernameField: 'email' }, authUser));

//   passport.serializeUser((user, done) => {
//     done(null, user.user_id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await getUserById(id);
//       done(null, user.rows[0]);
//     } catch (e) {
//       done(e);
//     }
//   });
// };

// export default initializePassport;
