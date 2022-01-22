const express = require('express');
const auth = require('./auth');
const books = require('./books');
const order = require('./order');
const isAuth = require('./middleware/isAuth');

const router = express.Router();

router.use('/auth', auth);
router.use('/books', books);
router.use('/order', isAuth, order);
module.exports = router;
