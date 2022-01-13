const { unlink } = require("fs-extra");
const path = require("path");
const { Error } = require("../helpers/validateError");

exports.validate = (req, res) => {
  const { description, title, schedule, location, cost } = req.body;
  const message = { error: [] };

  if (!title) {
    message.error.push("El titulo es requerido");
  }
  if (typeof title != "string") {
    message.error.push("El titulo ingresado es incorrecto");
  }
  if (!description) {
    message.error.push("La descripcion es requerida");
  }
  if (typeof description != "string") {
    message.error.push("La descripcion tiene un formato incorrecto");
  }
  if (!location) {
    message.error.push("La direccion es requerida");
  }
  if (typeof location != "string") {
    message.error.push("La direccion tiene un formato incorrecto");
  }
  if (!schedule) {
    message.error.push("El horario es requerida");
  }
  if (typeof schedule != "string") {
    message.error.push("El horario tiene un formato incorrecto");
  }
  if (!cost) {
    message.error.push("El costo es requerido");
  }
  if (typeof cost != "string") {
    message.error.push("El costo tiene un formato incorrecto");
  }

  if (message.error.length != 0) {
    unlink(path.resolve("./public/uploads/" + req.file.filename));
    Error(res, message);
  }
};

exports.validateUpdate = (req, res) => {
  const { description, title, schedule, location, cost } = req.body;
  const message = { error: [] };

  if (title) {
    if (typeof title != "string") {
      message.error.push("El titulo ingresado es incorrecto");
    }
  }

  if (description) {
    if (typeof description != "string") {
      message.error.push("La descripcion tiene un formato incorrecto");
    }
  }

  if (location) {
    if (typeof location != "string") {
      message.error.push("La direccion tiene un formato incorrecto");
    }
  }

  if (schedule) {
    if (typeof schedule != "string") {
      message.error.push("El horario tiene un formato incorrecto");
    }
  }

  if (cost) {
    if (typeof cost != "string") {
      message.error.push("El costo tiene un formato incorrecto");
    }
  }

  if (message.error.length != 0) {
    Error(res, message);
  }
};
