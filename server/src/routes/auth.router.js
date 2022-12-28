const express = require('express');
const authController = require('../controllers/auth.controller');
const { checkAuth, checkExpiredCookie } = require('../middleware/auth');

const router = express.Router();
router.get('/login', authController.getLogin);
router.get('/checkExpiredCookie', checkExpiredCookie);
router.post('/login', authController.postLogin);
router.delete('/logout', checkAuth, authController.logout);

module.exports = router;
