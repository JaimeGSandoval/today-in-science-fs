const express = require('express');
const authController = require('../controllers/auth.controller');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.delete('/logout', checkAuth, authController.logout);

module.exports = router;
