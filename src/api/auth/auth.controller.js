module.exports = {
  login: async (req, res) => {
    res.status(200).json({
      message: 'Login successful',
      token: 'This is jwt token',
    });
  },
  signup: async (req, res) => {
    res.status(201).json({
      message: 'Signup successful',
    });
  },
};
