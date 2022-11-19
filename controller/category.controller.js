// Importing Files
let Categories = require("./../model/category");
let sequelizeInstance = require("./../config/db.config");
let express = require("express");

// Creating Category Table
let createTable = async () => {
  await sequelizeInstance.sync({ force: true });
  insertCategories();
  console.log("Category table creataed successfully");
};

// Inserting Category Table
let insertCategories = async () => {
  await Categories.bulkCreate([
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

// Finding All Category
let getAllCategories = async (req, res, next) => {
  let categories = await Categories.findAll();
  res.writeHead(200, { "content-Type": "application/json" });
  res.write(JSON.stringify(categories));
  res.end();
};

// Finding All Category by Id
let getCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;

  let category = await Categories.findByPk(id);
  try {
    if (!category) {
      let categories = await Categories.findAll({
        where: {
          id: id,
        },
      });
      res.writeHead(200, { "content-Type": "application/json" });
      res.write(JSON.stringify(categories));
      res.end();
    }
  } catch (err) {
    next(err);
  }
};

// Adding New Category
let addNewCategory = async (req, res, next) => {
  try {
    let categoryToAdd = req.body.name;
    await Categories.create({
      name: categoryToAdd,
    });
    res.status(201).send("Data added");
    res.end();
  } catch (err) {
    next(err);
  }
};

// Deleting Category By Id
let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  let category = await Categories.findByPk(id);

  try {
    if (!category) {
      throw new Error("category not found");
    }
    await Categories.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("Data deleted");
    res.end();
  } catch (err) {
    next(err);
  }
};

// Updating Category by Id
let updateCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;

  try {
    let category = await Categories.findByPk(id);

    if (!category) {
      let categoryToUpdate = {
        name: req.body.name,
      };
      await Categories.update(categoryToUpdate, {
        where: {
          categoryId: id,
        },
      });
      let updatedCategory = await Categories.findByPk(id);
      res.status(200).send(updatedCategory);
    }
  } catch (err) {
    next(err);
  }
};

createTable();

let all = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
};

module.exports = all;
