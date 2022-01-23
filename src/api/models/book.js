const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookSchema = new Schema({
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  page: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
