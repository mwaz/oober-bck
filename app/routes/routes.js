const appRouter = function(app) {
  const users = require("../controllers/auth-controller");
  const cars = require("../controllers/car-controller");
  const passport = require("passport");
  // Create a new user
  const baseURL = "/oober/api";
  app.post("/auth/signup", users.signup);
  app.post("/auth/login", users.login);
  app.get(
    "/auth/profile",
    passport.authenticate("jwt", { session: false }),
    users.profile
  );

  app.post(
    `${baseURL}/cars`,
    passport.authenticate("jwt", { session: false }),
    cars.create
  );
  app.get(
    `${baseURL}/cars`,
    passport.authenticate("jwt", { session: false }),
    cars.getCars
  );
};

module.exports = appRouter;
