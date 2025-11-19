const verifyToken = require("../../common/middlewares/auth.middleware");
const authController = require("./auth.controller");
const router = require("express").Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/whoami", verifyToken, authController.whoami);

module.exports = {
  AuthRouter: router,
};
