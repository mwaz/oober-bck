const User = require("../models/user.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.signup = (req, res, next) => {
  //validate the user request
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    return res.status(400).send({
      message: "User details cannot be empty"
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send({
      message: "Passwords do not match"
    });
  }
  // Initialize object for a  new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  //Create a user
  User.addUser(user, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to create the user" + `${err}` || err
      });
    } else {
      res.json({
        success: true,
        message: "User Registered Successfully",
        user
      });
    }
  });
};
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Kindly fill in all login details" });
  }

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    User.comparePasswords(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          user.toJSON(),
          config[process.env.NODE_ENV]["SECRET"],
          {
            expiresIn: 604800
          }
        );

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, message: "Wrong Password" });
      }
    });
  });
};

exports.profile = (req, res, next) => {
  res.json({ user: req.user });
};
