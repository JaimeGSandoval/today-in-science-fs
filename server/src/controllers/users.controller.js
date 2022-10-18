const usersModel = require('../models/users/users.model');
const AppError = require('../utils/app-error');

module.exports = {
  httpGetAllUsers: async (req, res, next) => {
    try {
      const users = await usersModel.getAllUsers();

      if (!users.rows.length) {
        return next(new AppError('There are no users signed up yet.', 204));
      }

      return res.status(200).json({
        status: 'Success',
        data: {
          users: users.rows,
        },
      });
    } catch (e) {
      return next(new AppError('There was an error retrieving the users. Please try again.', 500));
    }
  },

  httpGetUserById: async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await usersModel.getUserById(parseInt(userId, 10));

      if (!user.rows.length) {
        return next(new AppError('There is no user by that ID', 400));
      }

      return res.status(200).json({
        status: 'Success',
        data: {
          user: user.rows[0],
        },
      });
    } catch (e) {
      return next(new AppError('There was an error retrieving the user. Please try again.', 500));
    }
  },
};
