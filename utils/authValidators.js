exports.validateAuth = async (req, callback) => {
  const username = req.body.username,
    email = req.body.email,
    password = req.body.password;
  confirmPassword = req.body.confirmPassword;

  if (!username) {
    let error = "Username cannot be empty";
    return callback(new Error(error));
  }
  if (!email) {
    let error = "Email cannot be empty";
    return callback(new Error(error));
  }
  if (!password) {
    let error = "Password cannot be empty";
    return callback(new Error(error));
  }
  if (!confirmPassword) {
    let error = "Confirm password cannot be empty";
    return callback(new Error(error));
  }
  if (password !== confirmPassword) {
    let error = "Passwords do not match";
    return callback(new Error(error));
  }
};

exports.validateLogin = (req, callback) => {
  if (!req.body.username || !req.body.password) {
    const loginError = new Error("Kindly fill in all login details");
    callback(loginError);
  }
};
