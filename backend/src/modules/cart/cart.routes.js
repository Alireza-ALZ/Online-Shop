const verifyToken = require("../../common/middlewares/auth.middleware");
const cartController = require("./cart.controller");
const router = require("express").Router();

router.post("/add", verifyToken, cartController.addToCart);
router.post("/remove", verifyToken, cartController.removeFromCart);
router.get("/get-items/:userId", verifyToken, cartController.getFromCart);

module.exports = {
  CartRouter: router,
};
