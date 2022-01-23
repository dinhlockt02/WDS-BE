const User = require('../models/user');
const Book = require('../models/book');
const AppError = require('../../common/errors/AppError');

const checkAllBooksIdExists = async ids => {
  try {
    const promiseBooks = ids.map(id => Book.findById(id));
    const books = await Promise.all(promiseBooks);
    if (books.includes(null) || books.includes(undefined)) {
      throw new AppError(400, 'Book not exists');
    }
  } catch (error) {
    throw new AppError(400, 'Book not exists');
  }
};

module.exports = {
  getCart: async userId => {
    const userWithPopulatedCart = await User.findById(userId).populate('cart.book');
    return userWithPopulatedCart.cart;
  },
  putCart: async ({userId, cart}) => {
    const user = await User.findById(userId);
    await checkAllBooksIdExists(cart.map(bookItem => bookItem.book));
    user.cart = cart;
    return user.save();
  },
};
