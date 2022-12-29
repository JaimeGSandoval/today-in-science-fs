const express = require('express');
const initiateController = require('../controllers/initiate.controller');

const router = express.Router();
router.get('/initiate', initiateController.httpInitiate);
router.post('/initiate', initiateController.httpInitiate);

module.exports = router;
