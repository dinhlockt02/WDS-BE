const Order = require('../models/order');
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
  createOrder: async ({userId, books}) => {
    const orderData = {books, userId};
    await checkAllBooksIdExists(books.map(book => book.bookId));
    const order = new Order(orderData);
    const orderDoc = await order.save();
    return orderDoc;
  },
  getOrders: async userId => {
    const existsUser = await User.findById(userId);
    if (!existsUser) {
      throw new AppError(404, 'User not found');
    }
    const ordersDoc = await Order.find({userId}).populate('books.bookId');
    return ordersDoc;
  },
};
