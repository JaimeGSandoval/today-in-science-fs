// USER QUERIES
exports.getUsernameQuery = 'SELECT user_name FROM users.users WHERE user_name = $1';
exports.getAllUsersQuery = 'SELECT user_id, user_name, email, role FROM users.users';
exports.getUserPasswordQuery = 'SELECT password FROM users.users WHERE email = $1';
exports.getUserEmailQuery = 'SELECT email FROM users.users WHERE email = $1';
exports.getUserByEmailQuery =
  'SELECT user_id, user_name, email, role FROM users.users WHERE email = $1';
exports.getUserByIdQuery =
  'SELECT user_id, user_name, email, role FROM users.users WHERE user_id = $1';

// SIGN UP QUERY
exports.signupUserQuery =
  'INSERT INTO users.users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, role';

// ARTICLE QUERIES
exports.addReadLaterUrlQuery =
  'INSERT INTO users.read_later_articles (user_id, article_title, article_url) VALUES ($1, $2, $3) RETURNING users.read_later_articles.article_url';

exports.addFavoriteUrlQuery =
  'INSERT INTO users.favorite_articles (user_id, article_title, article_url) VALUES ($1, $2, $3) RETURNING users.favorite_articles.article_url';

exports.getFavoriteUrlsQuery =
  'SELECT article_id, date_added, article_title, article_url FROM favorite_articles WHERE favorite_articles.user_id = $1';

exports.getReadLaterUrlsQuery =
  'SELECT article_id, date_added, article_title, article_url FROM read_later_articles WHERE read_later_articles.user_id = $1';

exports.getFavoriteByIdQuery =
  'SELECT article_id FROM users.favorite_articles WHERE users.favorite_articles.article_id = $1';

exports.getReadLaterByIdQuery =
  'SELECT article_id FROM users.read_later_articles WHERE users.read_later_articles.article_id = $1';

exports.deleteReadLaterUrlQuery =
  'DELETE FROM users.read_later_articles WHERE users.read_later_articles.article_id = $1';

exports.deleteFavoriteUrlQuery =
  'DELETE FROM users.favorite_articles WHERE users.favorite_articles.article_id = $1';

// SETTINGS QUERIES
exports.updateUsernameQuery =
  'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_name';
