const express = require('express');
const articlesController = require('../controllers/articles.controller');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();

router.use(checkAuth);
router.post('/', articlesController.httpAddArticle);
router.get('/favorite-articles', articlesController.httpGetFavoriteArticles);
router.get('/read-later-articles', articlesController.httpGetReadLaterArticles);
router.delete('/delete-article/:articleId', articlesController.httpDeleteArticle);

module.exports = router;
