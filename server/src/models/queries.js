// User queries
exports.getUserByEmailQuery =
  'SELECT user_id, user_name, email, role, password FROM users.users WHERE email = $1';
exports.getUsernameQuery = 'SELECT user_name FROM users.users WHERE user_name = $1';
exports.getAllUsersQuery = 'SELECT user_id, user_name, email, role FROM users.users';
exports.getUserPasswordQuery = 'SELECT password FROM users.users WHERE email = $1';
exports.getUserByIdQuery =
  'SELECT user_id, user_name, email, role FROM users.users WHERE user_id = $1';

// Auth queries
exports.signupUserQuery =
  'INSERT INTO users.users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, role';
