// desc Register new user
//route POST /api/users
//access Public

const registerUser = (req, res) => {
  res.json({ message: 'Register User' });
};

// desc Authenticate a user
//route POST /api/users/login
//access Public

const LoginUser = (req, res) => {
  res.json({ message: 'Login User' });
};

// desc get user data
//route GET /api/users/login
//access Public

const getMe = (req, res) => {
  res.json({ message: 'User data' });
};

module.exports = {
  registerUser,
  LoginUser,
  getMe,
};
