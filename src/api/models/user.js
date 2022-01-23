const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
      },
      quantity: {
        type: Number,
      },
    },
  ],
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
  },
});

module.exports = mongoose.model('User', userSchema);
