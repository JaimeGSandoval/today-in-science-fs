const db = require('../config/database');
const queries = require('./queries');

module.exports = {
  addArticle: async (userId, title, articleUrl, type, provider) => {
    let addedUrlResult;

    if (type === 'read-later') {
      addedUrlResult = await db.query(queries.addReadLaterUrlQuery, [
        userId,
        title,
        articleUrl,
        provider,
      ]);
      return addedUrlResult;
    }

    addedUrlResult = await db.query(queries.addFavoriteUrlQuery, [
      userId,
      title,
      articleUrl,
      provider,
    ]);
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

  getUrl: async (userId, articleTitle, articleType) => {
    let article;

    if (articleType === 'read-later') {
      article = await db.query(queries.getReadLaterUrlQuery, [userId, articleTitle]);
    } else {
      article = await db.query(queries.getFavoriteUrlQuery, [userId, articleTitle]);
    }

    return article;
  },

  deleteArticle: async (userId, articleTitle, articleType) => {
    if (articleType === 'read-later') {
      await db.query(queries.deleteReadLaterUrlQuery, [userId, articleTitle]);
    } else {
      await db.query(queries.deleteFavoriteUrlQuery, [userId, articleTitle]);
    }
  },
};
