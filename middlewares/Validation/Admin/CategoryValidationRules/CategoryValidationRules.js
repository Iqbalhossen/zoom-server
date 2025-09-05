const { body } = require("express-validator");
const CategoryValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Category name field is required"),
  ];
};

module.exports = {
  CategoryValidationRules,
};
