const mongoose = require("mongoose");
const model = require("../models/score");
const auth = require("./authController");
const { httpError } = require("../helpers/handleError");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createScore = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers["x-access-token"];

    const decode = auth.decoded(token);
    //const user = await userModel.findById(decode.id, { password: 0 })
    data.user_id = decode.id;

    await model.create(data, (err, docs) => {
      res.status(201).send(docs);
    });
  } catch (error) {
    httpError(res, error);
  }
};

exports.getScore = async (req, res) => {
  try {
    const scores = await model.find({});
    if (!scores) {
      res.status(404).send({});
    } else {
      res.status(200).send(scores);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getScoreById = async (req, res) => {
  try {
    const id = req.params.id;
    const score = await model.findById({ _id: parseId(id) });
    if (!score) {
      res.status(404).send({});
    } else {
      res.status(200).send(score);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.updateScoreById = async (req, res) => {
  //const { id } = req.params
  try {
    const id = req.params.id;
    const data = req.body;

    const doc = await model.findById({ _id: parseId(id) });
    if (!doc)
      return res.status(404).send({ message: "La puntuacion no existe" });

    model.updateOne({ _id: parseId(id) }, data, (err, doc) => {
      if (err) {
        console.log("Error", err);
        res
          .status(422)
          .send({ error: "El formato de datos ingresado es erroneo" });
      } else {
        res.status(200).send(doc);
      }
    });
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteScoreById = async (req, res) => {
  try {
    const id = req.params.id;

    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res
        .status(404)
        .send({ message: "La puntuacion que desea borrar no existe" });

    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};
