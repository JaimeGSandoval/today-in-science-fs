const express = require('express');
const settingsController = require('../controllers/settings.controller');
const { updateUsernameSchema } = require('../middleware/schemas');
const { validateSchema } = require('../middleware/validate-schema');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();
router.patch(
  '/update-username/:userId',
  checkAuth,
  updateUsernameSchema,
  validateSchema,
  settingsController.httpUpdateUsername
);

router.patch('/request-email-update/:userId', checkAuth, settingsController.httpUpdateEmailRequest);
router.get('/update-email/:token', settingsController.httpUpdateUserEmail);

module.exports = router;
