const db = require('../config/database');
const queries = require('./queries');

module.exports = {
  getUsername: async (username) => {
    const retrievedUsername = await db.query(queries.getUsernameQuery, [username]);

    return retrievedUsername;
  },

  updateUsername: async (username, userId) => {
    const updateResult = await db.query(queries.updateUsernameQuery, [username, userId]);

    return updateResult;
  },
};
