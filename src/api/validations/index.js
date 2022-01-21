const validator = require('validator');
const mongoose = require('mongoose');
const AppError = require('../../common/errors/AppError');

module.exports = {
  isEmail: email => {
    if (!email) {
      throw new AppError('400', 'Email required');
    }
    if (!validator.isEmail(email)) {
      throw new AppError('400', 'Not a valid email');
    }
  },
  isPassword: password => {
    if (!password) {
      throw new AppError('400', 'Password required');
    }
    if (validator.isEmpty(password)) {
      throw new AppError('400', 'Password must not empty');
    }
  },
  isName: name => {
    if (!name) {
      throw new AppError('400', 'Name required');
    }
    if (validator.isEmpty(name)) {
      throw new AppError('400', 'Name must not empty');
    }
  },
  isObjectId: id => {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError('404', 'Resource not found');
    }
  },
};
