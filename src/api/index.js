const express = require('express');
const auth = require('./auth');
const books = require('./books');

const router = express.Router();

router.use('/auth', auth);
router.use('/books', books);
module.exports = router;
