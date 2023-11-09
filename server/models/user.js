const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  login: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role_id: {
    type: Number,
    default: roles.GUEST,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
