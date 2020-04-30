// imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilioClient = require("./services/twilio");
const routes = require("./routes");

// config
const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.twilioClient = twilioClient;

  return next();
});

// routes
app.use(routes);

// listen
app.listen(3000, () => console.log("server on port 3000"));
