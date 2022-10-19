const db = require('../config/database');
const queries = require('./queries');

module.exports = {
  addArticle: async (userId, title, articleUrl, type) => {
    let addedUrlResult;

    if (type === 'read-later') {
      addedUrlResult = await db.query(queries.addReadLaterUrlQuery, [userId, title, articleUrl]);
      return addedUrlResult;
    }

    addedUrlResult = await db.query(queries.addFavoriteUrlQuery, [userId, title, articleUrl]);
    return addedUrlResult;
  },

  getFavoriteArticles: async (userId) => {
    const favoriteUrls = await db.query(queries.getFavoriteUrlsQuery, [userId]);
    return favoriteUrls;
  },

  getReadLaterArticles: async (userId) => {
    const readLaterUrls = await db.query(queries.getReadLaterUrlsQuery, [userId]);
    return readLaterUrls;
  },

  getArticleById: async (articleId, articleType) => {
    let article;

    if (articleType === 'read-later') {
      article = await db.query(queries.getReadLaterByIdQuery, [articleId]);
    } else {
      article = await db.query(queries.getFavoriteByIdQuery, [articleId]);
    }

    return article;
  },

  deleteArticle: async (articleId, articleType) => {
    if (articleType === 'read-later') {
      await db.query(queries.deleteReadLaterUrlQuery, [articleId]);
    } else {
      await db.query(queries.deleteFavoriteUrlQuery, [articleId]);
    }
  },
};
