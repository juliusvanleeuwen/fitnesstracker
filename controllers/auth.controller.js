const User = require("../models/users");
bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
bodyParser = require("body-parser");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ListController {
  //Register
  static async register(req, res) {
    if (req.body.password == undefined) {
      res.status(400).json({ message: "Password is required" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      role: "client",
    });
    try {
      await user.save();
      res.status(201).json({
        status: "Succeeded",
        message: user,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        error: err,
        message: "Registratie is niet gelukt.",
      });
    }
  }

  static async login(req, res) {
    let fetchedUser;
    const user = await User.findOne({ email: req.body.email });
    if (user == undefined) {
      return res.status(401).json({
        message: "Gebruiker niet kunnen vinden",
      });
    } else {
      fetchedUser = user;
      const comparison = await bcrypt.compare(req.body.password, user.password);
      if (comparison) {
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "juliusvanleeuwen",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "login successful",
          token: token,
          expiresIn: 3600000,
          userId: fetchedUser._id,
        });
      } else {
        res.status(400).json({ message: "Incorrect combination!" });
      }
    }
  }

  static async fetchCurrentUser(req, res) {
    const user = await User.findById(req.userData.userId);
    res.status(200).json(user);
  }

  static async fetchUserById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const user = await User.findById(req.params.id);

      if (user === undefined) {
        res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(user);
    } else {
      res.status(400).json("ObjectId is not valid.");
    }
  }

  static async fetchAllUsers(req, res) {
    const users = await User.find();
    res.status(200).json(users);
  }
};
