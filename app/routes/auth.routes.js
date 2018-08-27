const appRouter = function(app) {
  const users = require("../controllers/auth-controller.js");
  // Create a new user
  app.post("/auth/signup", users.signup);
  app.post("/auth/login", users.login);
  app.get("/auth/profile", users.profile);
};

module.exports = appRouter;
