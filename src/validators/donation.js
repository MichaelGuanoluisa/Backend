const { unlink } = require("fs-extra");
const path = require("path");

exports.validate = (req) => {
  const { description, type, delivery, address, date } = req.body;
  const message = { error: [] };

  if (!description) {
    message.error.push("La descripcion es requerida");
  }
  if (typeof description !== "string") {
    message.error.push("La descripcion tiene un formato incorrecto");
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
    delivery !== "retirar en domicilio" &&
    delivery !== "entregar en iglesia"
  ) {
    message.error.push(
      "La opcion de entrega puede ser de 2 tipos: retirar en domicilio o entregar en iglesia"
    );
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

  if (message.error.length !== 0) {
    if (req.file) {
      unlink(path.resolve("./public/uploads/" + req?.file?.filename));
    }
    return message;
  }
};

exports.validateUpdate = (req) => {
  const { description, type, delivery, address, date } = req.body;
  const messages = { error: [] };

  if (description) {
    if (typeof description !== "string") {
      messages.error.push("La descripcion tiene un formato incorrecto");
    }
  }

  if (type) {
    if (type !== "comida" || type !== "ropa" || type !== "dinero") {
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
      delivery !== "retirar en domicilio" ||
      delivery !== "entregar en iglesia"
    ) {
      messages.error.push(
        "La opcion de entrega puede ser de 2 tipos: retirar en domicilio o entregar en iglesia"
      );
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
};
