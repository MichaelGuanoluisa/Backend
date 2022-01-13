const mongoose = require("mongoose");
const { Error } = require("../helpers/validateError");

exports.validate = (req, res) => {
  const { score, questionary_id } = req.body;
  const message = { error: [] };
  if (!score) {
    message.error.push("El titulo es requerido");
  }
  if (typeof score != "number") {
    message.error.push("El titulo tiene un formato incorrecto");
  }
  if (!questionary_id) {
    message.error.push("El cuestionario es requerido");
  }
  if (typeof questionary_id != mongoose.Types.ObjectId) {
    message.error.push("El id del cuestionario tiene un formato incorrecto");
  }
  if (message.error.length != 0) {
    Error(res, message);
  }
};

exports.validateUpdate = (req, res) => {
  const { score, questionary_id } = req.body;
  const message = { error: [] };
  if (score) {
    if (typeof score != "number") {
      message.error.push("El titulo tiene un formato incorrecto");
    }
  }
  if (questionary_id) {
    if (typeof questionary_id != mongoose.Types.ObjectId) {
      message.error.push("El id del cuestionario tiene un formato incorrecto");
    }
  }

  if (message.error.length != 0) {
    Error(res, message);
  }
};
