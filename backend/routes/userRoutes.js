const express = require('express');
const router = express.Router();
const {
  registerUser,
  LoginUser,
  getMe,
} = require('../controller/UserController');

router.post('/', registerUser);

router.post('/login', LoginUser);

router.get('/me', getMe);

module.exports = router;
