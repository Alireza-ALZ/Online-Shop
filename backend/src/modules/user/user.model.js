const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Username must be at least 6 characters"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "Password is too short"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^09\d{9}$/,
      minLength: [11, "Phone number is invalid"],
      maxLength: [11, "Phone number is invalid"],
    },
  },
  { timestamps: true }
);

const userModel = model("user", UserSchema);

module.exports = userModel;
