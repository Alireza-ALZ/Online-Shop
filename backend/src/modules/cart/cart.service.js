const cartModel = require("../cart/cart.model");
const autoBind = require("auto-bind");

class CartService {
  #model;

  constructor() {
    this.#model = cartModel;
    autoBind(this);
  }

  async addItem(data) {
    const { userId, productId, quantity } = data;

    let cart = await this.#model.findOne({ userId });

    if (!cart) {
      cart = await this.#model.create({
        userId,
        items: [{ productId, quantity }],
      });

      return cart;
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) cart.items[itemIndex].quantity = quantity;
    else cart.items.push({ productId, quantity });

    await cart.save();

    return cart;
  }

  async removeItem(data) {
    const { userId, productId } = data;

    let cart = await this.#model.findOne({ userId });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await cart.save();

    return cart;
  }

  async getItems(userId) {
    const cart = await this.#model.findOne({ userId });

    return cart;
  }
}

module.exports = new CartService();
