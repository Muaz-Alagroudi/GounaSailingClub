const express = require("express");
const User = require("../models/userModel.js");
const protect = require("../middleWare/authMiddleware.js");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const SECRET_KEY = "1qw2";

const genToken = (_id) => {
  return jwt.sign({ _id }, SECRET_KEY, { expiresIn: "10m" });
};

Router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("[Error] users GET : " + error.message);
  }
});

Router.get("/me", protect, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (error) {
    console.log("[Error] user GET : " + error.message);
  }
});
Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log("[Error] user GET : " + error.message);
  }
});
// register
Router.post("/", async (req, res) => {
  try {
    const { username, email, number, role, password } = req.body;
    if (!username || !email || !role || !password || !number) {
      res
        .status(400)
        .json({ message: "please fill all fields", req: req.body });
      return;
    }
    const check = await User.findOne({ email });
    if (check) {
      res.status(409).json({ message: " user with this email already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      number,
      role,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      message: " user registered successfully",
      user: user,
      token: genToken(user._id),
    });
  } catch (error) {
    console.log("[Error]  user POST : " + error.message);
  }
});

// login
Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = genToken(user._id);
      res.cookie("token", token, {
        httpOnly: true, // Cannot be accessed via JavaScript
        // secure: true, // Ensure this is true if you're using HTTPS
        sameSite: "strict", // To prevent CSRF
        maxAge: 3600000, // 1 hour
      });
      res.status(200).json({
        message: "login successful",
        user: user,
        token
      })
    } else {
      res.status(400).json({ message: "login failed" });
    }
  } catch (error) {
    console.log("[Error] user login POST : " + error.message);
  }
});


Router.delete("/", async (req, res) => {
  try {
    const users = await User.deleteMany({});
    res.status(200).json({ message: "all users deleted successfully" });
  } catch (error) {
    console.log("[Error] " + error.message);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `user ${user} deleted successfully` });
  } catch (error) {
    console.log("[Error] user DEL : " + error.message);
  }
});

module.exports = Router;
