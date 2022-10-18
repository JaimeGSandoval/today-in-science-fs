const express = require('express');
const signupController = require('../controllers/signup.controller');
const { signupSchema } = require('../middleware/schemas');
const { validateSchema } = require('../middleware/validate-schema');

const router = express.Router();
router.post('/', signupSchema, validateSchema, signupController.httpSignupUser);

module.exports = router;
