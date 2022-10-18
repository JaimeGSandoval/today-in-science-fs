// Sign up queries
exports.getUserEmailQuery = 'SELECT email FROM users.users WHERE email = $1';
exports.getUsernameQuery = 'SELECT user_name FROM users.users WHERE user_name = $1';
exports.signupUserQuery =
  'INSERT INTO users.users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, role';
