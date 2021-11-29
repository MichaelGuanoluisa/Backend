const mongoose = require("mongoose");
const model = require("../models/events");
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

exports.createEvents = async (req, res) => {
  const data = req.body;
  const { title, description, imgURL, ubication, schedule, cost } = data;
  //crear un dato evento en la base de datos

  try {
    if (req.file && req.file.filename) {
      data.imgURL = req.file.filename;
      console.log("si existe el url");
    } else {
      data.imgURL = "prueba.png";
    }
  } catch (error) {
    console.log("Error", error);
  }

  model.create(data, (err, docs) => {
    if (err) {
      console.log("Error", err);
      res.send({ error: "Error" }, 422);
    } else {
      res.send({ message: "registro de evento correctamente" });
    }
  });
};

exports.getEvents = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getEventsById = async (req, res) => {
  const id = req.params.id;
  const news = await model.findById({ _id: parseId(id) });
  if (news == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(news);
  }
};

exports.updateEventsById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
    } else {
      const event = await model.findById({ _id: parseId(id) });
      body.imgURL = event.imgURL;
    }
    await model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      res.send({ message: "Evento actualizado correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    unlink(path.resolve("./uploads/" + doc.imgURL));
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error });
  }
};
