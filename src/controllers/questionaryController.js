const mongoose = require("mongoose");
const { httpError } = require("../helpers/handleError");
const model = require("../models/questionary");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createQuestionary = (req, res) => {
  try {
    const data = req.body;
    model.create(data, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.status(422).send({ error: err });
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
      res.status(204).send({});
    } else {
      res.status(200).send(docs);
    }
  } catch (error) {
    httpError(res, error);
  }
};

/*exports.getVideosById = async (req, res) => {
  const id = req.params.id;
  const news = await model.findById({ _id: parseId(id) });
  if (news == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(news);
  }
};
*/

exports.updateQuestionaryById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    //const { id } = req.params
    const question = await model.findById({ _id: parseId(id) });
    if (!question)
      return res.send(
        { message: "La pregunta que desea actualizar no existe" },
        204
      );

    await model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
      } else {
        res.send({ docs }, 200);
      }
    });
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
      return res.send(
        { message: "La pregunta que desea borrar no existe" },
        204
      );

    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteAllQuestionary = (req, res) => {
  try {
    model.deleteMany({}, (err, docs) => {
      if (!docs) {
        res.status(204).send({});
      }
      res.send(docs);
    });
  } catch (error) {
    httpError(res, error);
  }
};
