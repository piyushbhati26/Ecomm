// Importing Files
let sequelize = require("sequelize");
let dbConnection = require("./../config/db.config");

let categoryModel = dbConnection.define(
  "categories",
  {
    Id: {
      type: sequelize.DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = categoryModel;
