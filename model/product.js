// Importing Files
let sequelize = require("sequelize");
let dbConnection = require("./../config/db.config");

let productModel = dbConnection.define(
  "products",
  {
    Id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = productModel;
