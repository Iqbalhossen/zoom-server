const express = require("express");
const route = express.Router();

const {
  CategoryAllView,
  CategoryView,
  SingleCategoryView,
  CategoryStore,
  CategoryDelete,
  CategoryUpdate,
} = require("../../controllers/Admin/CategoryControllers");

const {
  CategoryValidationRules,
} = require("../../middlewares/Validation/Admin/CategoryValidationRules/CategoryValidationRules");

const {
  ValidateResults,
} = require("../../middlewares/Validation/ValidateResults/ValidateResults");

route.get("/all/view", CategoryAllView);
route.get("/view", CategoryView);
route.get("/view/:id", SingleCategoryView);
route.post("/store", CategoryValidationRules(), ValidateResults, CategoryStore);
route.delete("/delete/:id", CategoryDelete);
route.put(
  "/update/:id",
  CategoryValidationRules(),
  ValidateResults,
  CategoryUpdate
);

module.exports = route;
