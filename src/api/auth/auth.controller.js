const authService = require('./auth.service');

module.exports = {
  login: async (req, res) => {
    res.status(200).json({
      message: 'Login successful',
      token: 'This is jwt token',
    });
  },
  signup: async (req, res, next) => {
    try {
      const {name, email, password} = req.body;
      authService.isSignupDataValid({name, email, password});
      await authService.createUser({name, email, password});
      res.status(201).json({
        message: 'Create user successful',
      });
    } catch (err) {
      next(err);
    }
  },
};
