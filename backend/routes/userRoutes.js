const express = require('express');
const router = express.Router();
const {
  registerUser,
  LoginUser,
  getMe,
} = require('../controller/UserController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', LoginUser);

router.get('/me', protect, getMe);

module.exports = router;
