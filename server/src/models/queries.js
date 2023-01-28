// USER QUERIES
exports.getUsernameQuery = 'SELECT user_name FROM users WHERE user_name = $1';

exports.getAllUsersQuery = 'SELECT user_id, user_name, email, role FROM users';

exports.getUserPasswordQuery = 'SELECT password FROM users WHERE email = $1';

exports.getUserEmailQuery = 'SELECT email FROM users WHERE email = $1';

exports.getUserByEmailQuery = 'SELECT user_id, user_name, email, role FROM users WHERE email = $1';

exports.getUserByIdQuery = 'SELECT user_id, user_name, email, role FROM users WHERE user_id = $1';

exports.deleteUserByIdQuery = 'DELETE FROM users WHERE user_id = $1';

// SIGN UP QUERY
exports.signupUserQuery =
  'INSERT INTO users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, role';

// ARTICLE QUERIES
exports.addReadLaterUrlQuery =
  'INSERT INTO read_later_articles (user_id, article_title, article_url, provider) VALUES ($1, $2, $3, $4) RETURNING read_later_articles.article_url';

exports.addFavoriteUrlQuery =
  'INSERT INTO favorite_articles (user_id, article_title, article_url, provider) VALUES ($1, $2, $3, $4) RETURNING favorite_articles.article_url';

exports.getFavoriteUrlsQuery =
  'SELECT article_id, date_added, article_title, article_url, provider FROM favorite_articles WHERE favorite_articles.user_id = $1';

exports.getReadLaterUrlsQuery =
  'SELECT article_id, date_added, article_title, article_url, provider FROM read_later_articles WHERE read_later_articles.user_id = $1';

exports.getFavoriteByIdQuery =
  'SELECT article_id FROM favorite_articles WHERE favorite_articles.article_id = $1';

exports.getReadLaterByIdQuery =
  'SELECT article_id FROM read_later_articles WHERE read_later_articles.article_id = $1';

exports.getFavoriteUrlQuery =
  'SELECT article_title FROM favorite_articles WHERE user_id = $1 AND article_title = $2';

exports.getReadLaterUrlQuery =
  'SELECT article_title FROM read_later_articles WHERE user_id = $1 AND article_title = $2';

exports.deleteReadLaterUrlQuery =
  'DELETE FROM read_later_articles WHERE user_id = $1 AND article_title = $2';

exports.deleteFavoriteUrlQuery =
  'DELETE FROM favorite_articles WHERE user_id = $1 AND article_title = $2';

// SETTINGS QUERIES
exports.updateUsernameQuery =
  'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_name';

exports.updateUserEmailQuery = 'UPDATE users SET email = $1 WHERE user_id = $2 RETURNING email';

exports.updateUserPasswordQuery = 'UPDATE users SET password = $1 WHERE user_id = $2';
