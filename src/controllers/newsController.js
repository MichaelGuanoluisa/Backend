const mongoose = require("mongoose");
const model = require("../models/news");
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

exports.createNews = (req, res) => {
  const data = req.body;
  const { title, description, imgURL } = data;
  //crear un dato noticia en la base de datos

  try {
    const newNews = new model({
      title,
      description,
    });
    if (req.file && req.file.filename) {
      newNews.imgURL = `${req.file.filename}`;
      newNews.save();
      res.send({ message: "registro de noticias realizado con exito" });
    } else {
      res.send({ message: "no existe imagen" });
    }
  } catch (error) {
    res.send({ message: error });
  }
};

exports.getNews = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getNewsById = async (req, res) => {
  const id = req.params.id;
  const news = await model.findById({ _id: parseId(id) });
  if (news == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(news);
  }
};

exports.updateNewsById = async (req, res) => {
  const id = req.params.id;
  const newNews = req.body;
  try {
    if (req.file && req.file.filename) {
      newNews.imgURL = req.file.filename;
    } else {
      const notice = await model.findById({ _id: parseId(id) });
      newNews.imgURL = notice.imgURL;
    }
    model.updateOne({ _id: parseId(id) }, newNews, (err, docs) => {
      res.send({ message: "Noticia actualizada correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    unlink(path.resolve("./uploads/" + doc.imgURL));
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error });
  }
};
