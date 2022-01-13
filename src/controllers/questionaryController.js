const mongoose = require("mongoose");
const { httpError } = require("../helpers/handleError");
const model = require("../models/questionary");
const validations = require("../validators/questionary");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createQuestionary = async (req, res) => {
  try {
    const data = req.body;
    await validations.validate(req, res);

    const doc = await model.findOne({ name: data.name });
    if (doc)
      return res.status(406).send({ message: "El cuestionario ya existe" });

    await model.create(data, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res
          .status(422)
          .send({ error: "El formato de datos ingresado es erroneo" });
      } else {
        res.status(201).send(docs);
      }
    });
  } catch (error) {
    httpError(res, error);
  }
};

exports.getQuestionary = async (req, res) => {
  try {
    const docs = await model.find({});
    if (!docs) {
      res.status(404).send({});
    } else {
      res.status(200).send(docs);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getQuestionaryById = async (req, res) => {
  const id = req.params.id;
  const questionary = await model.findById({ _id: parseId(id) });
  if (questionary == null) {
    res.status(404).send({});
  } else {
    res.status(200).send(questionary);
  }
};

exports.updateQuestionaryById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await validations.validateUpdate(req, res);

    const questionary = await model.findById({ _id: parseId(id) });
    if (!questionary)
      return res
        .status(404)
        .send({ message: "El cuestionario que desea actualizar no existe" });

    await model.updateOne({ _id: parseId(id) }, body);
    const doc = await model.findById({ _id: parseId(id) });
    res.status(200).send(doc);
    
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteQuestionaryById = async (req, res) => {
  try {
    const id = req.params.id;
    //const { id } = req.params
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res
        .status(404)
        .send({ message: "El cuestionario que desea borrar no existe" });

    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteAllQuestionary = (req, res) => {
  try {
    model.deleteMany({}, (err, docs) => {
      if (!docs) {
        res.status(404).send({});
      }
      res.send(docs);
    });
  } catch (error) {
    httpError(res, error);
  }
};
