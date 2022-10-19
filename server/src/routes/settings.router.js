const express = require('express');
const settingsController = require('../controllers/settings.controller');

const router = express.Router();
router.patch('/update-username/:userId', settingsController.httpUpdateUsername);

module.exports = router;
