let express = require("express");
let productRouter = express.Router();
let productController = require("./../controller/products.controller");

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:productsId", productController.getProductById);

productRouter.post("/", productController.insertProducts);

module.exports = productRouter;
