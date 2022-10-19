const express = require('express');
const settingsController = require('../controllers/settings.controller');
const { updateUsernameSchema } = require('../middleware/schemas');
const { validateSchema } = require('../middleware/validate-schema');

const router = express.Router();
router.patch(
  '/update-username/:userId',
  updateUsernameSchema,
  validateSchema,
  settingsController.httpUpdateUsername
);

module.exports = router;
