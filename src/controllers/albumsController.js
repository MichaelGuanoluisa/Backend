const mongoose = require("mongoose");
const model = require("../models/album");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const path = require("path");

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

exports.createAlbums = (req, res) => {
  const data = req.body;
  const { title, description, imgURL } = data;
  //crear un dato album en la base de datos

  try {
    const newAlbum = new model({
      title,
      description,
    });
    if (req.file && req.file.filename) {
      newAlbum.imgURL = `${req.file.filename}`;
      newAlbum.save();
      res.send({ message: "registro de mensaje correctamente" });
    }
  } catch (error) {
    res.send({ message: error });
  }
};

exports.getAlbums = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getAlbumsById = async (req, res) => {
  const id = req.params.id;
  const product = await model.findById({ _id: parseId(id) });
  if (product == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(product);
  }
};

exports.updateAlbumsById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
    } else {
      const album = await model.findById({ _id: parseId(id) });
      body.imgURL = album.imgURL;
    }
    model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      res.send({ message: "Foto actualizada correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    unlink(path.resolve("./uploads/" + doc.imgURL));
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error });
  }
};
