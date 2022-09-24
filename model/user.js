const mongoose = require("mongoose");
const { use } = require("../app");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    default: null,
  },
  lname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  passwrod: {
    type: String,
  },

  token: {
    type: String,
  },
});

module.exports = mongoose.model("user");
