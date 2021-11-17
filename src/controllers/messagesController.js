const mongoose = require("mongoose");
const model = require("../models/messages");
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

exports.createMessages = (req, res) => {
  const data = req.body;
  const { title, description, imgURL } = data;
  //crear un dato message en la base de datos

  try {
    const newMessage = new model({
      title,
      description,
    });
    if (req.file && req.file.filename) {
      newMessage.imgURL = `${req.file.path}`;
      newMessage.save();
      res.send({ message: "registro de mensaje correctamente" });
    }
  } catch (error) {
    res.send({ message: error });
  }
};

exports.getMessages = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getMessagesById = async (req, res) => {
  const id = req.params.id;
  const product = await model.findById({ _id: parseId(id) });
  if (product == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(product);
  }
};

exports.updateMessagesById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (req.file && req.file.filename) {
      body.imgURL = req.file.path;
    } else {
      const message = await model.findById({ _id: parseId(id) });
      body.imgURL = message.imgURL;
    }
    model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      res.send({ message: "Mensaje actualizado correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteMessagesById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
};
