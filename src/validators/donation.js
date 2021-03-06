const { unlink } = require("fs-extra");
const path = require("path");

exports.validate = (req) => {
  const { description, type, delivery, address, date } = req.body;
  const message = { error: [] };

  if (typeof description !== "string") {
    message.error.push("La descripción tiene un formato incorrecto");
  }
  if (!type) {
    message.error.push("El tipo de donacion es requerida");
  }
  if (type !== "comida" && type !== "ropa" && type !== "dinero") {
    message.error.push(
      "La donacion debe ser uno de 3 tipos: comida, ropa o dinero"
    );
  }
  if (typeof type !== "string") {
    message.error.push("El tipo de donacion tiene un formato incorrecto");
  }

  if (!delivery) {
    message.error.push("La entrega es requerida");
  }
  if (
    delivery !== "entrega vía transacción" &&
    delivery !== "entrega en iglesia" &&
    delivery !== "entrega vía servicio" &&
    delivery !== "retiro en el hogar"
  ) {
    message.error.push("La opcion de entrega no es permitida");
  }
  if (typeof delivery !== "string") {
    message.error.push("La entrega tiene un formato incorrecto");
  }
  if (address) {
    if (typeof address !== "string") {
      message.error.push("La direccion tiene un formato incorrecto");
    }
  }
  if (!date) {
    message.error.push("La fecha es requerida");
  }
  if (typeof date !== "string") {
    message.error.push("La fecha tiene un formato incorrecto");
  }
  if (!req.file) {
    message.error.push("La foto es necesaria");
  }

  if (message.error.length !== 0) {
    if (req.file?.filename) {
      unlink(path.resolve("./public/uploads/" + req?.file?.filename));
    }
    return message;
  }
  return null;
};

exports.validateUpdate = (req) => {
  const { description, type, delivery, address, date } = req.body;
  const id = req.params.id;
  const messages = { error: [] };

  if (id) {
    if (id.length < 24) {
      messages.error.push("El id es incorrecto");
    }
  } else {
    messages.error.push("El id es incorrecto");
  }
  if (description) {
    if (typeof description !== "string") {
      messages.error.push("La descripcion tiene un formato incorrecto");
    }
  }

  if (type) {
    if (type !== "comida" && type !== "ropa" && type !== "dinero") {
      messages.error.push(
        "La donacion debe ser uno de 3 tipos: comida, ropa o dinero"
      );
    }
    if (typeof type !== "string") {
      messages.error.push("El tipo de donacion tiene un formato incorrecto");
    }
  }

  if (delivery) {
    if (
      delivery !== "entrega vía transacción" &&
      delivery !== "entrega en iglesia" &&
      delivery !== "entrega vía servicio" &&
      delivery !== "retiro en el hogar"
    ) {
      messages.error.push("La opcion de entrega no es permitida");
    }
    if (typeof delivery !== "string") {
      messages.error.push("La entrega tiene un formato incorrecto");
    }
  }
  if (address) {
    if (typeof address !== "string") {
      messages.error.push("La direccion tiene un formato incorrecto");
    }
  }

  if (date) {
    if (typeof date !== "string") {
      messages.error.push("La fecha tiene un formato incorrecto");
    }
  }

  if (messages.error.length !== 0) {
    return messages;
  }
  return null;
};
