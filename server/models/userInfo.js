// userInfo.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  gender: String,
  email: String,
  passportnumber: String,
  nationality: String,
  flights: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flight" }],
});

const UserInfo = mongoose.model("UserInfo", userSchema);

module.exports = UserInfo;
