const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../../common/errors/AppError');

const isLoggedIn = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) throw new AppError(401, 'UNAUTHORIZED');
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new AppError(401, 'UNAUTHORIZED');
    }
    const decodeToken = jwt.verify(token, 'secret');
    const user = await User.findById(decodeToken.userID);
    if (!user) {
      throw new AppError(404, 'USER NOT FOUND');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user) throw new AppError(401, 'UNAUTHORIZED');
    if (req.user.role !== 'admin') throw new AppError(401, 'UNAUTHORIZED');
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
