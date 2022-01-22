const orderService = require('./order.service');

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const {books} = req.body;
      await orderService.createOrder({books, userId: req.user._id});
      res.status(201).json({message: 'Create order successful'});
    } catch (err) {
      next(err);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const DTO = await orderService.getOrders(userId);
      res.status(200).json({message: 'Get orders successful', orders: DTO});
    } catch (err) {
      next(err);
    }
  },
};
