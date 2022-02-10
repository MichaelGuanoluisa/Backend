const mongoose = require("mongoose");
const model = require("../models/events");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const { httpError } = require("../helpers/handleError");
const path = require("path");
const fs = require("fs");
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
    const errors = validations.validate(req, res);

    if (errors) {
      return res.status(406).send(errors);
    } else {
      const doc = await model.findOne({ title: data.title });
      if (doc) {
        deleteImage(req);
        return res.status(400).send({ message: "El evento ya existe" });
      }

      if (req.file && req.file.filename) {
        data.imgURL = req.file.filename;
        console.log("si existe el url");
      } else {
        data.imgURL = "ifgf.png";
      }

      model.create(data, (err, docs) => {
        return res.status(201).send(docs);
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getEvents = async (req, res) => {
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

exports.getEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findById({ _id: parseId(id) });
    if (!doc) {
      res.status(404).send({});
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
    const errors = validations.validateUpdate(req);
    if (errors) {
      return res.status(406).send(errors);
    } else {
      const event = await model.findById({ _id: parseId(id) });
      if (!event) {
        deleteImage(req);
        return res
          .status(404)
          .send({ message: "El evento que desea actualizar no existe" });
      }

      const data = await model.findOne({ title: body.title });
      if (data) {
        deleteImage(req);
        return res.status(406).send({ message: "El evento ya existe" });
      }

      if (req.file && req.file.filename) {
        body.imgURL = req.file.filename;
        if (event.imgURL != "ifgf.png") {
          if (fs.existsSync(path.resolve("./public/uploads/" + event.imgURL))) {
            unlink(path.resolve("./public/uploads/" + event.imgURL));
          }
        }
      } else {
        body.imgURL = event.imgURL;
      }
      await model.updateOne({ _id: parseId(id) }, body);
      const doc = await model.findById({ _id: parseId(id) });
      return res.status(200).send(doc);
    }
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
      if (fs.existsSync(path.resolve("./public/uploads/" + doc.imgURL))) {
        unlink(path.resolve("./public/uploads/" + doc.imgURL));
      }
    }
    res.status(200).send({ message: "Eliminado con éxito" });
  } catch (error) {
    httpError(res, error);
  }
};

function deleteImage(req) {
  if (req.file?.filename) {
    unlink(path.resolve("./public/uploads/" + req.file?.filename));
  }
}
