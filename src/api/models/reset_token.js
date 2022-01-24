const mongoose = require('mongoose');

const {Schema} = mongoose;

const tokenSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    token: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('ResetToken', tokenSchema);
