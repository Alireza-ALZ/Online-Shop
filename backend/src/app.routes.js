const { AuthRouter } = require("./modules/auth/auth.routes");
const mainRouter = require("express").Router();

mainRouter.use("/auth", AuthRouter);

module.exports = mainRouter;
