const { body } = require("express-validator");
const UserModel = require("./../../../models/UserModel");
const userLoginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email field is required")
      .isEmail()
      .withMessage("Enter valid email"),

    body("password").notEmpty().withMessage("Password field is required"),
  ];
};

const UserSignupValidationRules = () => {
  return [
    body("full_name")
      .trim()
      .notEmpty()
      .withMessage("Full name field is required"),

    body("email")
      .notEmpty()
      .withMessage("Email field is required")
      .isEmail()
      .withMessage("Enter valid email")
      .custom(async (value) => {
        try {
          const Email = await UserModel.findOne({ email: value });
          if (Email) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        } catch (error) {}
      })
      .withMessage("Email already exsits"),

    // body("password")
    //   .notEmpty()
    //   .withMessage("Password field is required")
    //   .isLength({ min: 8 })
    //   .withMessage("Password must be at least 8 chars")
    //   .matches(/[a-z]/)
    //   .withMessage("Password must contain at least one lowercase letter")
    //   .matches(/[A-Z]/)
    //   .withMessage("Password must contain at least one uppercase letter")
    //   .matches(/\d/)
    //   .withMessage("Password must contain at least one number")
    //   .matches(/[\W_]/)
    //   .withMessage("Password must contain at least one special character"),

    body("cpassword")
      .notEmpty()
      .withMessage("Confirm Password field is required")
      .custom((value, { req }) => {
        if (value === req.body.password) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage("Confirm Password dose not match"),
  ];
};

const UserForgotPasswordValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email field is required")
      .isEmail()
      .withMessage("Enter valid email"),
  ];
};
const UserResetPasswordValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email field is required")
      .isEmail()
      .withMessage("Enter valid email"),

    // body("password")
    //   .notEmpty()
    //   .withMessage("New password field is required")
    //   .isLength({ min: 8 })
    //   .withMessage("Password must be at least 8 chars")
    //   .matches(/[a-z]/)
    //   .withMessage("Password must contain at least one lowercase letter")
    //   .matches(/[A-Z]/)
    //   .withMessage("Password must contain at least one uppercase letter")
    //   .matches(/\d/)
    //   .withMessage("Password must contain at least one number")
    //   .matches(/[\W_]/)
    //   .withMessage("Password must contain at least one special character"),

    body("cpassword")
      .notEmpty()
      .withMessage("Confirm Password field is required")
      .custom((value, { req }) => {
        if (value === req.body.password) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage("Confirm Password dose not match"),
  ];
};

module.exports = {
  userLoginValidationRules,
  UserSignupValidationRules,
  UserForgotPasswordValidationRules,
  UserResetPasswordValidationRules,
};
