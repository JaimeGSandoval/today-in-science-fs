const db = require('../config/database');
const queries = require('./queries');

module.exports = {
  getAllUsers: async () => {
    const users = await db.query(queries.getAllUsersQuery);
    return users;
  },

  getUserByEmail: async (email) => {
    const user = await db.query(queries.getUserByEmailQuery, [email]);
    return user;
  },

  getUserPassword: async (email) => {
    const userPassword = await db.query(queries.getUserPasswordQuery, [email]);
    return userPassword;
  },

  getUserById: async (userId) => {
    const user = await db.query(queries.getUserByIdQuery, [userId]);
    return user;
  },

  getUsername: async (username) => {
    const user = await db.query(queries.getUsernameQuery, [username]);
    return user;
  },

  deleteUserById: async (userId) => {
    await db.query(queries.deleteUserByIdQuery, [userId]);
  },
};
