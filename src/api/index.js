const express = require('express');
const auth = require('./auth');
const books = require('./books');
const order = require('./order');
const cart = require('./cart');
const isAuth = require('./middleware/isAuth');
const imageUpload = require('./imageUpload');

const router = express.Router();

router.use('/auth', auth);
router.use('/books', books);
router.use('/order', isAuth.isLoggedIn, order);
router.use('/image-upload', imageUpload);
router.use('/cart', isAuth.isLoggedIn, cart);

module.exports = router;
