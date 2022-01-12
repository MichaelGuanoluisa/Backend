const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("description").exists().isString(),
  check("type")
    .exists()
    .isString()
    .custom((value, { req }) => {
      if (value != "comida" || value != "ropa" || value != "dinero") {
        throw new Error("solo puede ser de 3 tipos: comida, ropa o dinero");
      }
      return true;
    }),
  check("delivery")
    .exists()
    .isString()
    .custom((value, { req }) => {
      if (value != "comida" || value != "iglesia") {
        throw new Error("solo puede ser de 2 tipos: ");
      }
      return true;
    }),
  check("location").exists().isString(),
  check("date").exists().isString(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };
