/**
 * root file for api configuration
 */
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/routes/routes");
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch(() => {
    console.log("unable to connect to the database  Exiting now..");
    process.exit();
  });

// create express app
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
// listen for requests

app.use(express.static(path.join(__dirname, "public")));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

const server = app.listen(3004, function() {
  console.log("app running on", server.address().port);
});

module.exports = server;
