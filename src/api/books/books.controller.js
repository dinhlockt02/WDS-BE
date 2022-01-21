const booksService = require('./books.service');

module.exports = {
  getBooks: async (req, res, next) => {
    try {
      const {search} = req.query;
      const DTO = await booksService.getBooks(search);
      res.status(200).json({products: DTO});
    } catch (err) {
      next(err);
    }
  },
  getOneBook: async (req, res, next) => {
    try {
      const {id} = req.params;
      const DTO = await booksService.getOneBook(id);
      res.status(200).json(DTO._doc);
    } catch (err) {
      next(err);
    }
  },
};
