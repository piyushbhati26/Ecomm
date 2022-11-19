// Importing Files
let express = require("express");
let serverConfig = require("./config/server.config");
let bodyParser = require("body-parser");
let router = require("./routes/index");
let ErrorHandler = require("./middlewares/ErrorHandler");
let App = express();

// Using Middlewares
App.use(bodyParser.json());
App.use(router);
App.use(ErrorHandler);

// Creating ServerPort
App.listen(serverConfig.PORT, () => {
  console.log("Server is running on port " + serverConfig.PORT);
});
