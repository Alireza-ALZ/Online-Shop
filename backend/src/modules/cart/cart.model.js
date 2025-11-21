const { model, Schema } = require("mongoose");

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = model("cart", CartSchema);

module.exports = CartModel;
