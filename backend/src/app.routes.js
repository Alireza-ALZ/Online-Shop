const { AuthRouter } = require("./modules/auth/auth.routes");
const { CartRouter } = require("./modules/cart/cart.routes");
const mainRouter = require("express").Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/cart", CartRouter);

module.exports = mainRouter;
