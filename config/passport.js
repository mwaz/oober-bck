const JwtSTrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../app/models/user.model");
const config = require("../config");
const dbConfig = require("./dbConfig");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = dbConfig.secret;
  passport.use(
    new JwtSTrategy(opts, (jwt_payload, done) => {
      User.getUserById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
