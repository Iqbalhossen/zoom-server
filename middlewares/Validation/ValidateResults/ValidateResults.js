const { validationResult } = require("express-validator");
const ValidateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({
      success: false,
      errors: errors.mapped(),
    });
  };
  

  module.exports = {
    ValidateResults
  };