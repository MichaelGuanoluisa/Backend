const { unlink } = require("fs-extra");
const path = require("path");

exports.validate = (req) => {
  const { title, description } = req.body;
  const message = { error: [] };
  if (!title) {
    message.error.push("El titulo es requerido");
  }
  if (!description) {
    message.error.push("La descripcion es requerida");
  }
  if (typeof title !== "string") {
    message.error.push("El titulo ingresado es incorrecto");
  }
  if (typeof description !== "string") {
    message.error.push("La descripcion ingresada es incorrecta");
  }
  if (message?.error?.length !== 0) {
    unlink(path.resolve("./public/uploads/" + req.file.filename));
    return message;
  }
};

exports.validateUpdate = (req, res, next) => {
  const { title, description } = req.body;
  const message = { error: [] };
  if (title) {
    if (typeof title !== "string") {
      message.error.push("El titulo ingresado es incorrecto");
    }
  }
  if (description) {
    if (typeof description !== "string") {
      message.error.push("La descripcion ingresada es incorrecta");
    }
  }

  if (message?.error?.length !== 0) {
    return message;
  }
};
