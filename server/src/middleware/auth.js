const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json('Unauthorized. You must be logged in to view this page. Redirecting to login page.');
  }

  next();
};

const checkExpiredCookie = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      expired: true,
    });
  }

  return res.status(200).json({
    expired: false,
  });
};

const verifyRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json('Unauthorized. You do not have permission to view this page. Redirecting.');
    }

    next();
  };

module.exports = {
  checkAuth,
  verifyRoles,
  checkExpiredCookie,
};
