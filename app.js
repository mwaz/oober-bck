/**
 * root file for api configuration
 */
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/routes/routes");
// const dbConfig = require("./config/database.config");
const config = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

mongoose.Promise = global.Promise;
// const dbURL = config[process.env.NODE_ENV]['DATABASE'];
mongoose
  .connect(
    config[process.env.NODE_ENV]["DATABASE"],
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch(() => {
    console.log("unable to connect to the database  Exiting now..");
    // process.exit();
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

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

require("./config/passport")(passport);
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

const port = config[process.env.NODE_ENV]["PORT"] || 3005;

const server = app.listen(port, function() {
  console.log("app running on", server.address().port);
});

module.exports = server;
