const { Error } = require("../helpers/validateError");

exports.validate = (req, res) => {
  const { name } = req.body;
  const message = { error: [] };
  if (!name) {
    message.error.push("El nombre es requerido");
  }
  if (typeof name != "string") {
    message.error.push("El nombre ingresado es incorrecto");
  }
  if (message.error.length != 0) {
    Error(res, message);
  }
};

exports.validateUpdate = (req, res) => {
  const { name } = req.body;
  const message = { error: [] };
  if (!name) {
    if (typeof name != "string") {
      message.error.push("El nombre ingresado es incorrecto");
    }
  }
  if (message.error.length != 0) {
    Error(res, message);
  }
};
