require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");

const user = require("./model/user");

const app = express();
app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("<h1>hello everyone i am swati </h1>");
});

app.get("/register", async (req, resp) => {
  const { fname, lname, email, password } = req.body;

  if (!(email && password && fname && lname)) {
    resp.status(400).send("all feilds are required");
  }

  const existingUser = await user.findOne({ email });

  if (existingUser) {
    resp.status(401).send("user already exist");
  }

  const myEncPassword = await bcrypt.hash(password, 10);

  const user = await user.create({
    fname,
    lname,
    email: email.toLowerCase(),
    password: myEncPassword,
  });
});

module.exports = app;
