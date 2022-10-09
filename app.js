require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("./model/user");

const app = express();
app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("<h1>hello everyone i am swati </h1>");
});

app.get("/register", async (req, resp) => {
  try {
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
    // token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECREAT_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    resp.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
