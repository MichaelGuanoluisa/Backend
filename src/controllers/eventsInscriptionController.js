const mongoose = require("mongoose");
const model = require("../models/events");
const auth = require("./authController");
const { httpError } = require("../helpers/handleError");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createInscription = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const id = req.params.id;
    const json = { inscriptions: [] };

    const event = await model.findById({ _id: parseId(id) });

    if (!event)
      return res.status(404).send({ message: "evento no encontrado" });

    const decoded = await auth.decoded(token);
    const user_id = decoded.id;

    //comprobar si existen usuarios ya registrados en un evento
    if (event.inscriptions.length != 0) {
      for (let i = 0; i < event.inscriptions.length; i++) {
        if (event.inscriptions[i].toString() === user_id) {
          return res
            .status(406)
            .send({ message: "usuario ya registrado al evento" });
        }
        json.inscriptions[i] = event.inscriptions[i].toString();
      }
    }

    if (event.inscriptions.length < event.number) {
      json.inscriptions.unshift(user_id);
    } else {
      return res
        .status(406)
        .send({ message: "Actualmente no hay cupo para inscribirse" });
    }

    await model
      .updateOne({ _id: parseId(id) }, json, (err, docs) => {
        if (err) {
          console.log("Error", err);
          res.status(422).send({ error: "Body incorrecto" });
        } else {
          res.send({ message: "usuario registrado con exito" });
        }
      })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (error) {
    httpError(res, error);
  }
};

exports.getInscriptions = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = auth.decoded(token);

    docs = await model.find({ inscription: parseId(decoded.id) });
    if (!docs) {
      res.status(404).send({});
    } else {
      res.status(200).send(docs);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteInscriptionById = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers["x-access-token"];
    const decoded = auth.decoded(token);

    const doc = model.findById({ _id: parseId(id) });
    if (!doc) return res.status(404).send({ message: "evento no encontrado" });

    for (let i = 0; i < doc.inscriptions.length; i++) {
      if (decoded.id === doc.inscriptions[i]) {
        doc.inscriptions.splice(i, 1);
      }
    }

    await model.updateOne({ _id: parseId(id) });
    const event = model.findById({ _id: parseId(id) });
    return res.status(200).send(event);
  } catch (error) {
    httpError(res, error);
  }
};
