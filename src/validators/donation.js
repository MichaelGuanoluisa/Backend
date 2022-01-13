const { unlink } = require("fs-extra");
const path = require("path");
const { Error } = require("../helpers/validateError");

exports.validate = (req, res) => {
  const { description, type, delivery, address, date } = req.body;
  const message = { error: [] };

  if (!description) {
    message.error.push("La descripcion es requerida");
  }
  if (!type) {
    message.error.push("El tipo de donacion es requerida");
  }
  if (type != "comida" || type != "ropa" || type != "dinero") {
    message.error.push(
      "La donacion debe ser uno de 3 tipos: comida, ropa o dinero"
    );
  }
  if (typeof type != "string") {
    message.error.push("El tipo de donacion tiene un formato incorrecto");
  }
  if (typeof description != "string") {
    message.error.push("La descripcion tiene un formato incorrecto");
  }
  if (!delivery) {
    message.error.push("La entrega es requerida");
  }
  if (delivery != "retirar en domicilio" || delivery != "entregar en iglesia") {
    message.error.push(
      "La opcion de entrega puede ser de 2 tipos: retirar en domicilio o entregar en iglesia"
    );
  }
  if (typeof delivery != "string") {
    message.error.push("La entrega tiene un formato incorrecto");
  }
  if (address) {
    if (typeof address != "string") {
      message.error.push("La direccion tiene un formato incorrecto");
    }
  }
  if (!date) {
    message.error.push("La fecha es requerida");
  }
  if (typeof date != "string") {
    message.error.push("La fecha tiene un formato incorrecto");
  }

  if (message.error.length != 0) {
    unlink(path.resolve("./public/uploads/" + req.file.filename));
    Error(res, message);
  }
};

exports.validateUpdate = (req, res) => {
  const { description, type, delivery, address, date } = req.body;
  const message = { error: [] };

  if (description) {
    if (typeof description != "string") {
      message.error.push("La descripcion tiene un formato incorrecto");
    }
  }

  if (type) {
    if (type != "comida" || type != "ropa" || type != "dinero") {
      message.error.push(
        "La donacion debe ser uno de 3 tipos: comida, ropa o dinero"
      );
    }
    if (typeof type != "string") {
      message.error.push("El tipo de donacion tiene un formato incorrecto");
    }
  }

  if (delivery) {
    if (
      delivery != "retirar en domicilio" ||
      delivery != "entregar en iglesia"
    ) {
      message.error.push(
        "La opcion de entrega puede ser de 2 tipos: retirar en domicilio o entregar en iglesia"
      );
    }
    if (typeof delivery != "string") {
      message.error.push("La entrega tiene un formato incorrecto");
    }
  }
  if (address) {
    if (typeof address != "string") {
      message.error.push("La direccion tiene un formato incorrecto");
    }
  }

  if (date) {
    if (typeof date != "string") {
      message.error.push("La fecha tiene un formato incorrecto");
    }
  }

  if (message.error.length != 0) {
    Error(res, message);
  }
};
