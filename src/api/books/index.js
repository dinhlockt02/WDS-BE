const express = require('express');
const isAuth = require('../middleware/isAuth');
const bookController = require('./books.controller');

const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/', [isAuth.isLoggedIn, isAuth.isAdmin], bookController.createBook);
router.get('/:id', bookController.getOneBook);

module.exports = router;
