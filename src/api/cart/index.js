const express = require('express');
const cartController = require('./cart.controller');

const router = express.Router();

router.get('/', cartController.getCart);
router.put('/', cartController.putCart);

module.exports = router;
