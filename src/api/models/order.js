const mongoose = require('mongoose');

const {Schema} = mongoose;

const orderSchema = new Schema({
  books: [
    {
      bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
      },
      quantity: {
        type: Number,
        min: 0,
      },
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Order', orderSchema);
