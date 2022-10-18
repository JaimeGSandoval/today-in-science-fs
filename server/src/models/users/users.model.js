const db = require('../../config/database');
const queries = require('./queries');

module.exports = {
  getAllUsers: async () => {
    const users = await db.query(queries.getAllUsers);
    return users;
  },

  getUserById: async (userId) => {
    const user = await db.query(queries.getUserById, [userId]);
    return user;
  },
};
