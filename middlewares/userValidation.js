const { check, validationResult } = require("express-validator");
const { unlink } = require("fs");
const path = require("path");

const userValidation = [
  check("username").isLength({ min: 1 }).withMessage("user name is required"),
  check("email").isEmail().withMessage("invalid email address"),
  check("password")
    .isStrongPassword()
    .withMessage(
      "plzz must be a strong password with min-8 char,uppercase lowercase and symble"
    ),
];

const addUserValidate = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(201).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  userValidation,
  addUserValidate,
};
