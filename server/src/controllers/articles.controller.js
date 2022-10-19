const articlesModel = require('../models/articles.model');
const AppError = require('../utils/app-error');

module.exports = {
  httpAddArticle: async (req, res, next) => {
    const { articleTitle, articleUrl, articleType } = req.body;
    const { user_id } = req.user;

    if (!user_id) {
      return next(new AppError('User ID is required.', 400));
    }

    if (!articleUrl) {
      return next(new AppError('Article url is missing.', 400));
    }

    try {
      const addedUrl = await articlesModel.addArticle(
        user_id,
        articleTitle,
        articleUrl,
        articleType
      );

      return res.status(201).json({
        status: 'Success',
        data: {
          addedUrl: addedUrl.rows[0],
        },
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },

  httpGetFavoriteArticles: async (req, res, next) => {
    const { user_id } = req.user;

    if (!user_id) {
      next(new AppError('User ID is required.', 400));
    }

    try {
      const favoriteArticles = await articlesModel.getFavoriteArticles(user_id);

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
    const { user_id } = req.user;

    if (!user_id) {
      next(new AppError('User ID is required.', 400));
    }

    try {
      const readLaterArticles = await articlesModel.getReadLaterArticles(parseInt(user_id, 10));

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
    const { articleId } = req.params;
    const { articleType } = req.body;

    try {
      const foundArticle = await articlesModel.getArticleById(parseInt(articleId, 10), articleType);

      if (!foundArticle.rows.length) {
        return next(new AppError('Article not found. It may have been deleted already', 404));
      }

      await articlesModel.deleteArticle(parseInt(articleId, 10), articleType);

      return res.sendStatus(204);
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  },
};
