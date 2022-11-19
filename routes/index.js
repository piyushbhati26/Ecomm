let express = require("express");
const { route } = require("./categories.route");
let router = express.Router();
let categoryRouter = require("./categories.route");
let productRouter = require("./products.route");

router.get("/", (req, res, next) => {
  res.write("This is the base page");
  res.end();
});

router.use("/ecomm/api/v1/categories", categoryRouter); // for using categories
router.use("/ecomm/api/v1/products", productRouter); //for using products

module.exports = router;
