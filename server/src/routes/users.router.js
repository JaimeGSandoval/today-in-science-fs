const express = require('express');
const usersController = require('../controllers/users.controller');
const { checkAuth } = require('../middleware/auth');

const { verifyRoles } = require('../middleware/auth');

const router = express.Router();
router.get('/', checkAuth, verifyRoles('admin'), usersController.httpGetAllUsers);
router.delete('/delete-user/:userId', checkAuth, usersController.httpDeleteUser);

module.exports = router;
