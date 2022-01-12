const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("title").exists().not().isEmpty(),
  check("description").exists().not().isEmpty(),
  check("type").exists().not().isEmpty(),
  check("url").exists().isURL(),
  (req, res, next) => {
    console.log("hola validacion");
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };
