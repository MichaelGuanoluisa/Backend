const mongoose = require("mongoose");
const model = require("../models/album");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

const upload = multer(multerConfig).single("file");

exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.send({ message: error });
    }
    return next();
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
      newAlbum.imgURL = `${req.file.path}`;
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

exports.updateAlbumsById = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (req.file && req.file.filename) {
      body.imgURL = req.file.path;
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

exports.deleteAlbumsById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
};
