const appRouter = function(app) {
  const users = require("../controllers/auth-controller");
  const cars = require("../controllers/car-controller");
  const passport = require("passport");
  const privateRoute = passport.authenticate("jwt", { session: false });

  // Create a new user
  const baseURL = "/oober/api";
  app.post("/auth/signup", users.signup);
  app.post("/auth/login", users.login);
  app.get("/auth/profile", privateRoute, users.profile);

  app.post(`${baseURL}/cars`, privateRoute, cars.create);
  app.put(`${baseURL}/cars/:id`, privateRoute, cars.editCar);
  app.get(`${baseURL}/cars`, privateRoute, cars.getCars);
  app.get(`${baseURL}/cars/:id`, privateRoute, cars.getCar);
  app.delete(`${baseURL}/cars/:id`, privateRoute, cars.deleteCar);
};

module.exports = appRouter;
