const express = require('express');
const authController = require('../controllers/signup.controller');
const { signupSchema } = require('../middleware/schemas');
const { validateSchema } = require('../middleware/validate-schema');

const router = express.Router();
router.post('/signup', signupSchema, validateSchema, authController.httpSignupUser);

module.exports = router;
