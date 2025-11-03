const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class PasswordManager {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}

module.exports = new PasswordManager();
