const authService = require("./auth.service");
const autoBind = require("auto-bind");

class AuthController {
  #service;

  constructor() {
    this.#service = authService;
    autoBind(this);
  }

  async signup(req, res, next) {
    try {
      const { username, password, email, phone } = req.body;
      const result = await this.#service.createUser({
        username,
        password,
        email,
        phone,
      });

      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await this.#service.verifyUser({ username, password });

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
