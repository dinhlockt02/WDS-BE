const mongoose = require('mongoose');

const {Schema} = mongoose;

const tokenSchema = new Schema({
    userID: {
        type: Number

    },
    token: {
        type: String
    }






});
module.export = mongoose.model('ResetToken', tokenSchema);