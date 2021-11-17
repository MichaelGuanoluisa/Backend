const mongoose = require("mongoose");
const model = require("../models/events");
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

exports.createEvents = (req, res) => {
  const data = req.body;
  const { title, description, imgURL, ubication, schedule, cost } = data;
  //crear un dato evento en la base de datos

  try {
    const newEvent = new model({
      title,
      description,
      ubication,
      schedule,
      cost,
    });
    if (req.file && req.file.filename) {
      newEvent.imgURL = `${req.file.filename}`;
      newEvent.save();
      res.send({ message: "registro de evento correctamente" });
    }
  } catch (error) {
    res.send({ message: error });
  }
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
    model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      res.send({ message: "Evento actualizado correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteVideosById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
};
