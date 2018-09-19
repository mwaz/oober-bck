/**
 * root file for api configuration
 */
const express = require("express"),
  bodyParser = require("body-parser"),
  routes = require("./app/routes/routes"),
  config = require("./config"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  path = require("path"),
  passport = require("passport"),
  swaggerUi = require("swagger-ui-express"),
  YAML = require("yamljs"),
  swaggerDocument = YAML.load("./swagger.yaml");

mongoose.Promise = global.Promise;
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
    process.exit();
  });

// create express app
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

const port = config[process.env.NODE_ENV]["PORT"] || 3005;

const server = app.listen(port, function() {
  console.log("app running on", server.address().port);
});
module.exports = server;
