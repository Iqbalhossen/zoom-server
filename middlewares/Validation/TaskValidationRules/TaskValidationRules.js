const { body } = require("express-validator");
const TaskStoreValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Task field is required"),
    body("dis").notEmpty().withMessage("Description field is required"),
  ];
};

module.exports = {
  TaskStoreValidationRules,
};
