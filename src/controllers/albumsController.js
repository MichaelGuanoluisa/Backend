const mongoose = require("mongoose");
const model = require("../models/album");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const path = require("path");
const { httpError } = require("../helpers/handleError");

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

exports.createAlbums = async (req, res) => {
  try {
    const data = req.body;

    const doc = await model.findOne({ title: data.title });
    if (doc) return res.send({ message: "La foto ya existe" }, 400);

    if (req.file && req.file.filename) {
      doc.imgURL = `${req.file.filename}`;
    } else {
      doc.imgURL = "ifgf.png";
    }

    await model.create(data, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
      } else {
        res.status(201).send({ docs });
      }
    });
  } catch (error) {
    httpError(res, e);
  }
};

exports.getAlbums = async (req, res) => {
  try {
    const docs = await model.find({});
    if (docs == null) {
      res.status(204).send({});
    } else {
      res.status(204).send(docs);
    }
  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.getAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findById({ _id: parseId(id) });
    if (doc == null) {
      res.status(204).send({});
    } else {
      res.status(204).send(doc);
    }
  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.updateAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const album = await model.findById({ _id: parseId(id) });
    if (!album)
      return res.send(
        { message: "La foto que desea actualizar no existe" },
        400
      );

    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
      unlink(path.resolve("./uploads/" + album.imgURL));
    } else {
      body.imgURL = album.imgURL;
    }

    await model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
      } else {
        res.send({ docs }, 201);
      }
    });
  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.deleteAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res.send({ message: "La foto que desea borrar no existe" }, 400);

    if (doc.imgURL != "ifgf.png") {
      unlink(path.resolve("./uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error }, 500);
  }
};
