const mongoose = require("mongoose");
const eventModel = require("../models/events");
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

  try {
    const data = req.body;
    if (req.file && req.file.filename) {
      data.imgURL = req.file.filename;
      console.log("si existe el url");
    } else {
      data.imgURL = "ifgf.png";
    }

    eventModel.create(data, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "Error" }, 422);
      } else {
        res.send({ message: "registro de evento correctamente" });
      }
    });

  } catch (error) {
    console.log("Error", error);
  }

  
};

exports.getEvents = (req, res) => {
  eventModel.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getEventsById = async (req, res) => {
  const id = req.params.id;
  const news = await eventModel.findById({ _id: parseId(id) });
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
    const event = await eventModel.findById({ _id: parseId(id) });
    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
      unlink(path.resolve("./uploads/" + event.imgURL));
    } else {
      body.imgURL = event.imgURL;
    }
    await eventModel.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      res.send({ message: "Evento actualizado correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await eventModel.findOneAndDelete({ _id: parseId(id) });
    if(!doc.imgURL === "ifgf.png"){
      unlink(path.resolve("./uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error });
  }
};

