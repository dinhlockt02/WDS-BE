const express = require('express');
const bookController = require('./books.controller');
const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getOneBook);

module.exports = router;
