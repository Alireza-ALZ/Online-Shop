const passwordManager = require("../../common/utils/password");
const userModel = require("../user/user.model");
const autoBind = require("auto-bind");

class AuthService {
  #model;

  constructor() {
    this.#model = userModel;
    autoBind(this);
  }

  async createUser(userData) {
    const { username, password, email, phone } = userData;

    const allUsers = await this.#model.find();
    const isExist = allUsers.find(
      (user) => user.username === username || user.email === email
    );
    if (isExist) throw "User already exist";

    const user = await this.#model.create({
      username,
      password: passwordManager.hashPassword(password),
      email,
      phone,
    });

    return user;
  }

  async verifyUser(userData) {
    const { username, password } = userData;

    const user = await this.#model.findOne({ username });

    if (user) {
      if (passwordManager.verifyPassword(password, user.password))
        return {
          token: passwordManager.signToken({
            id: user._id,
            email: user.email,
            phone: user.phone,
          }),
        };
      throw "Password is incorrect";
    }
    throw "User does not exist";
  }

  async userInfo(user) {
    return await this.#model.findById(user.id);
  }
}

module.exports = new AuthService();
