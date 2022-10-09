const mongoose = require("mongoose");
const { use } = require("../app");
// const Schema = mongoose.Schema;

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

module.exports = mongoose.model("users", userSchema);
