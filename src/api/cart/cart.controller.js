const cartService = require('./cart.service');

module.exports = {
  getCart: async (req, res, next) => {
    try {
      const DTO = await cartService.getCart(req.user._id);
      res.status(200).json({
        message: 'Successful',
        cart: DTO,
      });
    } catch (err) {
      next(err);
    }
  },
  putCart: async (req, res, next) => {
    try {
      const {cart} = req.body;
      await cartService.putCart({userId: req.user._id, cart});
      res.status(200).json({
        message: 'Update cart successful',
      });
    } catch (err) {
      next(err);
    }
  },
};
