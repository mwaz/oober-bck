const moongoose = require("mongoose");

const UserSchema = moongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    confirmPassword: String
  },
  {
    timestamps: true
  }
);

module.exports = moongoose.model("User", UserSchema);
