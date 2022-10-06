const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/UserController');

router.post('/', registerUser);

module.exports = router;
