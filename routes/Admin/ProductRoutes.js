const express = require("express");
const route = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = require('../../middlewares/file/uploadMiddleware');

const {
  ProductView,
  ProductStore,
  ProductDelete,
    ProductActiveInactive,
    ProductStock,

} = require("../../controllers/Admin/ProductController");

const { ProductValidationRules } = require('../../middlewares/Validation/Admin/ProductValidationRules/ProductValidationRules');
const {ValidateResults } = require('../../middlewares/Validation/ValidateResults/ValidateResults');


route.get("/view", ProductView);
route.post("/store", uploadMiddleware('image'),  ProductStore);
route.delete("/delete/:id",  ProductDelete);
route.put("/active/inactive/:id",  ProductActiveInactive);
route.put("/stock/:id",  ProductStock);


module.exports = route;
