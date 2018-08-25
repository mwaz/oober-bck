const User = require("../models/user.model");

exports.create = (req, res) => {
  //validate the request
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
  // Create a new recipe
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.password
  });

  //save the recipe in the database
  user
    .save()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      })
    );
};
