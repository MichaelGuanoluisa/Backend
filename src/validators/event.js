const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("title").exists(),
  check("description").exists(),
  check("location").exists(),
  check("schedule").exists(),
  check("cost").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };