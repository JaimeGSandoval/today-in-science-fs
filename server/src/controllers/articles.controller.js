const articlesModel = require('../models/articles.model');
const AppError = require('../utils/app-error');

module.exports = {
  httpAddArticle: async (req, res, next) => {
    const { userId, articleTitle, articleUrl, articleType, provider } = req.body;

    if (!userId) {
      return next(new AppError('User ID is required.', 400));
    }

    if (!articleUrl) {
      return next(new AppError('Article url is missing.', 400));
    }

    try {
      const addedUrl = await articlesModel.addArticle(
        userId,
        articleTitle,
        articleUrl,
        articleType,
        provider
      );

      if (!addedUrl.rows.length) {
        return next('Error adding article to list', 500);
      }

      return res.sendStatus(201);
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },

  httpGetFavoriteArticles: async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      next(new AppError('User ID is required.', 400));
    }

    try {
      const favoriteArticles = await articlesModel.getFavoriteArticles(userId);

      return res.status(200).json({
        status: 'Success',
        data: {
          favoriteArticles: favoriteArticles.rows,
        },
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },

  httpGetReadLaterArticles: async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      next(new AppError('User ID is required.', 400));
    }

    try {
      const readLaterArticles = await articlesModel.getReadLaterArticles(parseInt(userId, 10));

      return res.status(200).json({
        status: 'Success',
        data: {
          readLaterArticles: readLaterArticles.rows,
        },
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },

  httpDeleteArticle: async (req, res, next) => {
    const { articleTitle, userId, articleType } = req.body;

    try {
      await articlesModel.deleteArticle(userId, articleTitle, articleType);

      return res.sendStatus(204);
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },
};
