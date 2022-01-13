const mongoose = require("mongoose");
const model = require("../models/events");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const { httpError } = require("../helpers/handleError");
const path = require("path");
const validations = require("../validators/event");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

const upload = multer(multerConfig).single("file");

exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.send({ message: error });
    } else {
      return next();
    }
  });
};

exports.createEvents = async (req, res) => {
  try {
    const data = req.body;
    await validations.validate(req, res);

    const doc = await model.findOne({ title: data.title });
    if (doc) {
      unlink(path.resolve("./public/uploads/" + req.file.filename));
      return res.status(406).send({ message: "El evento ya existe" });
    }

    if (req.file && req.file.filename) {
      data.imgURL = req.file.filename;
      console.log("si existe el url");
    } else {
      data.imgURL = "ifgf.png";
    }

    model.create(data, (err, docs) => {
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

exports.getEvents = async (req, res) => {
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

exports.getEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findById({ _id: parseId(id) });
    if (!doc) {
      res.status(204).send({});
    } else {
      res.status(200).send(doc);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.updateEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await validations.validateUpdate(req, res);

    const event = await model.findById({ _id: parseId(id) });
    if (!event) {
      unlink(path.resolve("./public/uploads/" + req.file.filename));
      return res
        .status(404)
        .send({ message: "El evento que desea actualizar no existe" });
    }

    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
      unlink(path.resolve("./public/uploads/" + event.imgURL));
    } else {
      body.imgURL = event.imgURL;
    }
    await model.updateOne({ _id: parseId(id) }, body);
    const doc = await model.findById({ _id: parseId(id) });
    res.status(200).send(doc);
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res.send({ message: "El evento que desea borrar no existe" }, 204);

    if (doc.imgURL != "ifgf.png") {
      unlink(path.resolve("./public/uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};
