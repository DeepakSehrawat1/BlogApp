const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = model("User", UserSchema);

module.exports = userModel;
