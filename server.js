// Importing Files
let express = require("express");
let App = express();
let serverConfig = require("./config/server.config");
let bodyParser = require("body-parser");
let router = require("./routes/index");
let ErrorHandler = require("./middlewares/ErrorHandler");
let dbConnection = require("./config/db.config");
let Category = require("./model/category");
let Product = require("./model/product");

Category.hasMany(Product);

// Using Middlewares
App.use(bodyParser.json());
App.use(router);
App.use(ErrorHandler);

//Creating category table
let init = async () => {
  await dbConnection.sync({ force: true });
  insertCategories();
};

// Inserting Category Table
let insertCategories = async () => {
  await Category.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "Mobiles",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appliances",
    },
  ]);
};
// Creating ServerPort
App.listen(serverConfig.PORT, () => {
  console.log("Server is running on port " + serverConfig.PORT);
  init();
});
