const express = require('express');
const usersController = require('../controllers/users.controller');
const { verifyRoles } = require('../middleware/auth');

const router = express.Router();
router.get('/', verifyRoles('admin'), usersController.httpGetAllUsers);

module.exports = router;
