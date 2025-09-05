const { body } = require("express-validator");
const ProductValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name field is required"),
    body("categories").notEmpty().withMessage("categories field is required"),
    body("slug").notEmpty().withMessage("slug field is required"),
    body("description").notEmpty().withMessage("description field is required"),
    body("price").notEmpty().withMessage("price field is required"),
    body("discount").notEmpty().withMessage("discount field is required"),
    body("stock").notEmpty().withMessage("stock field is required"),
    body("status").notEmpty().withMessage("status field is required"),
   
  ];
};

module.exports = {
    ProductValidationRules,
};
