const jwt = require('jsonwebtoken');

module.exports = {
  signJWT: (userData, jwt_secret, expires) => {
    const user = {
      ...userData,
    };

    const token = jwt.sign(user, jwt_secret, { expiresIn: expires });

    return token;
  },

  verifyJWT: (token, jwt_secret) => {
    try {
      const decoded = jwt.verify(token, jwt_secret);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (e) {
      return {
        valid: false,
        expired: e.message === 'jwt expired',
        decoded: null,
      };
    }
  },
};
