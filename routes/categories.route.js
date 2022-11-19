// Importing Files
let express = require("express");
let categoryRouter = express.Router();
let categoryController = require("./../controller/category.controller");
let requestValidator = require("./../middlewares/RequestValidator");

categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.getCategoryById
);

categoryRouter.post(
  "/",
  [requestValidator.validateReqForCategoryName],
  categoryController.addNewCategory
);

categoryRouter.delete(
  "/:categoryId",
  [requestValidator.validateReqForCategoryName],
  categoryController.deleteCategoryById
);

categoryRouter.put(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.updateCategoryById
);

module.exports = categoryRouter;
