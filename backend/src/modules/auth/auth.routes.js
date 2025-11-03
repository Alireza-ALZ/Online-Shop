const authController = require("./auth.controller");
const router = require("express").Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = {
  AuthRouter: router,
};
