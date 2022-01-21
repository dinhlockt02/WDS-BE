const AppError = require('../../common/errors/AppError');
const Book = require('../models/book');
const customValidator = require('../validations');

module.exports = {
  getBooks: async search => {
    if (!search) {
      return Book.find();
    }
    return Book.find({title: {$regex: new RegExp(search, 'i')}});
  },
  getOneBook: async id => {
    customValidator.isObjectId(id);
    const book = await Book.findById(id);
    if (!book) {
      throw new AppError(404, 'Resource not found');
    }
    return book;
  },
};
