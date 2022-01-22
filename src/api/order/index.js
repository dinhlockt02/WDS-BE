const express = require('express');
const orderController = require('./order.controller');

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);

module.exports = router;
