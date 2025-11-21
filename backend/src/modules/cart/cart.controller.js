const cartService = require("./cart.service");
const autoBind = require("auto-bind");

class CartController {
  #service;

  constructor() {
    this.#service = cartService;
    autoBind(this);
  }

  async addToCart(req, res, next) {
    try {
      const { userId, productId, quantity } = req.body;

      const cart = await this.#service.addItem({ userId, productId, quantity });

      res.json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { userId, productId } = req.body;

      const cart = await this.#service.removeItem({ userId, productId });

      res.json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
