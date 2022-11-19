// Importing Files
let Products = require("./../model/product");
let sequelizeInstance = require("./../config/db.config");

// Creating Product Table
let createTable = async () => {
  await sequelizeInstance.sync({ force: true });
  insertProducts();
  console.log("Product table is created");
};

// Inserting Product Table
let insertProducts = async () => {
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
      categoryId: 5,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 5,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 2,
      price: 32000,
    },
  ]);
};

// Finding All Product
let getAllProducts = async (req, res, next) => {
  let products = await Products.findAll();
  res.writeHead(200, { "content-Type": "application/json" });
  res.write(JSON.stringify(products));
  res.end();
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

createTable();

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProductById,
};
