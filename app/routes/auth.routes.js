const appRouter = function(app) {
  const users = require("../controllers/authentication.js");
  // Create a new note
  app.post("/auth/signup", users.create);
};

module.exports = appRouter;
