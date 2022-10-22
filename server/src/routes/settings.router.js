const express = require('express');
const settingsController = require('../controllers/settings.controller');
const {
  updateUsernameSchema,
  updateEmailSchema,
  updatePasswordSchema,
} = require('../middleware/schemas');
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

router.patch(
  '/update-email-request/:userId',
  checkAuth,
  updateEmailSchema,
  validateSchema,
  settingsController.httpUpdateEmailRequest
);

router.patch(
  '/update-password-request/:userId',
  checkAuth,
  updatePasswordSchema,
  validateSchema,
  settingsController.httpUpdatePasswordRequest
);

router.get('/forgot-password', settingsController.httpUpdatePasswordRequest);
router.get('/update-email/:token', settingsController.httpUpdateUserEmail);
router.get('/update-password/:token', settingsController.httpUpdateUserPassword);

module.exports = router;
