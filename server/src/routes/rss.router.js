const express = require('express');
const rssController = require('../controllers/rss.controller');

const router = express.Router();
// router.get('/:category', rssController.httpRssFeed);
router.get('/', rssController.httpRssFeed);

module.exports = router;
