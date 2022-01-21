const bcrypt = require('bcrypt');
const customValidator = require('../validations');
const User = require('../models/user');
const AppError = require('../../common/errors/AppError');

module.exports = {
  isSignupDataValid: ({name, email, password}) => {
    customValidator.isName(name);
    customValidator.isEmail(email);
    customValidator.isPassword(password);
  },
  createUser: async ({name, email, password}) => {
    const existUser = await User.findOne({email});
    if (existUser) {
      throw new AppError(201, 'User exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({name, email, password: hashedPassword, role: 'user'});
    const userDoc = await user.save();
    return userDoc;
  },
};
