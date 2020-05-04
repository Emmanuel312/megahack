// imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilioClient = require("./services/twilio");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
// config
const app = express();
mongoose.connect("mongodb://localhost/megahack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//middlewares
app.use(cors());
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
