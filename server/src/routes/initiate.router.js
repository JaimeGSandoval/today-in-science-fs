const express = require('express');
// const rssController = require('../controllers/rss.controller');
const initiateController = require('../controllers/initiate.controller');

const router = express.Router();
// router.get('/', rssController.httpRssFeed);
router.get('/initiate', initiateController.httpInitiate);
router.post('/initiate', initiateController.httpInitiate);

module.exports = router;
