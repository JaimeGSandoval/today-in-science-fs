const settingsModel = require('../models/setttings.modal');
const usersModel = require('../models/users.model');
const AppError = require('../utils/app-error');

module.exports = {
  httpUpdateUsername: async (req, res, next) => {
    // const { user_id } = req.user;
    const { userId } = req.params;
    const { newUsername } = req.body;

    try {
      const userNameExists = await usersModel.getUsername(newUsername);

      if (userNameExists.rows.length) {
        return next(new AppError('That username is already taken.', 409));
      }

      const userUpdated = await settingsModel.updateUsername(newUsername, parseInt(userId, 10));

      // res.locals.user.userName = userUpdated.rows[0].user_name;

      // const { userName, email, role } = res.locals.user;

      // const newUserData: User = {
      //   userId: res.locals.user.userId,
      //   userName,
      //   email,
      //   role,
      // };

      // const newAccessToken = signJWT(
      //   newUserData,
      //   process.env.ACCESS_TOKEN_SECRET as string,
      //   260
      // );

      // return res.status(200).json({
      //   status: 'Success',
      //   data: {
      //     updated: userUpdated.rows[0].user_name,
      //     newAccessToken,
      //   },
      // });

      res.status(200).json({
        status: 'Success',
        data: {
          newUsername: userUpdated.rows[0].user_name,
        },
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },
};
