// Importing Files
let Products = require("./../model/product");
let dbConnection = require("./../config/db.config");
const { Sequelize } = require("sequelize");
const e = require("express");

// // Creating Product Table
// let createTable = async () => {
//   await sequelizeInstance.sync({ force: true });
//   insertProducts();
//   console.log("Product table is created");
// };

// Inserting Product Table
let insertProducts = async (req, res, next) => {
  await Products.bulkCreate([
    {
      name: "Samsung Galaxy Note",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 1,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 2,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 3,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 2,
      price: 32000,
    },
  ]);

  res.status(201).json({
    message: "Products added",
  });
};

// Finding All Product
let getAllProducts = async (req, res, next) => {
  let categoryId = req.query.categoryId;
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let products = [];

  if (Object.keys(req.query).length == 0) {
    products = await Products.findAll();
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      products = await filterByCategory(categoryId);
    } else if (!categoryId && minPrice && maxPrice) {
      products = await filterByPriceRange(minPrice, maxPrice);
    } else {
      products = await Products.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [Sequelize.Op.gte]: minPrice,
            [Sequelize.Op.lte]: maxPrice,
          },
        },
      });
    }
  }

  res.status(200).json(products);
  res.end();
};

let filterByCategory = async (categoryId) => {
  let filteredProducts = await Products.findAll({
    where: {
      categoryId: categoryId,
    },
  });

  return filteredProducts;
};

let filterByPriceRange = async (minPrice, maxPrice) => {
  let filteredProducts = await Products.findAll({
    where: {
      price: {
        [Sequelize.Op.gte]: minPrice,
        [Sequelize.Op.lte]: maxPrice,
      },
    },
  });

  return filteredProducts;
};

// Finding All Product by Id
let getProductById = async (req, res, next) => {
  let id = req.params.productsId;
  let product = await Products.findByPk(id);

  try {
    if (!product) {
      let products = await Products.findAll({
        where: {
          id: id,
        },
      });
      res.writeHead(200, { "content-Type": "application/json" });
      res.write(JSON.stringify(products));
      res.end();
    }
  } catch (err) {
    next(err);
  }
};

// Adding New Product
let addNewProduct = async (req, res, next) => {
  try {
    let ProductToAdd = req.body.name;
    await Products.create({
      name: ProductToAdd,
    });
    res.status(201).send("Data added");
    res.end();
  } catch (err) {
    next(err);
  }
};

// Deleting Product By Id
let deleteProductById = async (req, res, next) => {
  let id = req.params.productId;
  let product = await Products.findByPk(id);

  try {
    if (!product) {
      throw new Error("category not found");
    }
    await Products.destroy({
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

// Updating Product by Id
let updateProductById = async (req, res, next) => {
  let id = req.params.productId;

  try {
    let product = await Products.findByPk(id);

    if (!product) {
      let productToUpdate = {
        name: req.body.name,
      };
      await products.update(productToUpdate, {
        where: {
          productId: id,
        },
      });
      let updatedProduct = await Products.findByPk(id);
      res.status(200).send(updatedProduct);
    }
  } catch (err) {
    next(err);
  }
};

// createTable();

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProductById,
  insertProducts,
};
