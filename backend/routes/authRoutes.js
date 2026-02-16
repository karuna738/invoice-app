const express = require('express');
const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  getUsersAll
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/getUsers', getUsersAll);

module.exports = router; // ✅ CommonJS export
