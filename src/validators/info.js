const { unlink } = require("fs-extra");
const path = require("path");
const { Error } = require("../helpers/validateError");

exports.validate = (req, res) => {
  const { title, description } = req.body;
  const message = { error: [] };
  if (!title) {
    message.error.push("El titulo es requerido");
  }
  if (!description) {
    message.error.push("La descripcion es requerida");
  }
  if (typeof title != "string") {
    message.error.push("El titulo ingresado es incorrecto");
  }
  if (typeof description != "string") {
    message.error.push("La descripcion ingresada es incorrecta");
  }
  if (message.error.length != 0) {
    unlink(path.resolve("./public/uploads/" + req.file.filename));
    Error(res, message);
  }
};

exports.validateUpdate = (req, res) => {
  const { title, description } = req.body;
  const message = { error: [] };
  if (title) {
    if (typeof title != "string") {
      message.error.push("El titulo ingresado es incorrecto");
    }
  }
  if (description) {
    if (typeof description != "string") {
      message.error.push("La descripcion ingresada es incorrecta");
    }
  }

  if (message.error.length != 0) {
    Error(res, message);
  }
};
