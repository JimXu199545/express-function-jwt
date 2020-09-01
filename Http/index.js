const passport = require("passport");
const bodyParser = require("body-parser");
const createHandler = require("azure-function-express").createHandler;
const express = require("express");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// init and configure passport
app.use(passport.initialize());

// Configure passport
require("../config/passport")(passport);

require("../config/mongo")
  .connect()
  .catch((error) => {
    throw error;
  });

app.get(
  "/api/getUserIdFromJwt",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json(req.user);
  }
);

// Binds the express app to an Azure Function handler
module.exports = createHandler(app);
