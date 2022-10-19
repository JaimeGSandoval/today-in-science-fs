const db = require('../config/database');
const queries = require('./queries');

module.exports = {
  getUserEmail: async (email) => {
    const user = await db.query(queries.getUserEmailQuery, [email]);
    return user;
  },

  signupUser: async (userName, email, password, role = 'user') => {
    const newUser = await db.query(queries.signupUserQuery, [userName, email, password, role]);
    return newUser;
  },
};
