const getAllUsers = 'SELECT user_id, user_name, email, role FROM users.users';
const getUserById = 'SELECT user_id, user_name, email, role FROM users.users WHERE user_id = $1';
const getUserEmail = 'SELECT password FROM users.users WHERE email = $1';

module.exports = {
  getAllUsers,
  getUserById,
  getUserEmail,
};
