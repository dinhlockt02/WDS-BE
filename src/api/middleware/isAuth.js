const User = require('../models/user');

module.exports = async (req, res, next) => {
  req.user = await User.findById('61ea954fc68f3bfcd9da5238');
  next();
};
