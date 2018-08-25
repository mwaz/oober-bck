const appRouter = function(app) {
  const users = require("../controllers/authentication.js");
  // Create a new user
  app.post("/auth/signup", users.create);
  app.post("/auth/login", users.create);
};

module.exports = appRouter;
