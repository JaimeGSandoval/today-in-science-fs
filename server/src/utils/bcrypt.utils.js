const bcrypt = require('bcrypt');

exports.encryptPassword = async (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

exports.comparePasswords = async (password, storedPassword) => {
  const match = await bcrypt.compare(password, storedPassword);
  return match;
};
