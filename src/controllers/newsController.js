const mongoose = require("mongoose");
const model = require("../models/news");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const { httpError } = require("../helpers/handleError");
const path = require("path");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

const upload = multer(multerConfig).single("file");

const fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.send({ message: error });
    } else {
      return next();
    }
  });
};

const createNews = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const doc = await model.findOne({ title: data.title });
    if (doc) return res.send({ message: "La noticia ya existe" }, 400);

    if (req.file && req.file.filename) {
      data.imgURL = `${req.file.filename}`;
    } else {
      data.imgURL = "ifgf.png";
    }
    await model.create(data, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
      } else {
        res.status(201).send(docs);
      }
    });
  } catch (error) {
    httpError(res, error);
  }
};

const getNews = async (req, res) => {
  try {
    const news = await model.find({});
    if (!news) {
      res.status(204).send({});
    } else {
      res.status(200).send(news);
    }
  } catch (error) {
    httpError(res, error);
  }
};

const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await model.findById({ _id: parseId(id) });
    if (!news) {
      res.status(204).send({});
    } else {
      res.status(200).send(news);
    }
  } catch (error) {
    httpError(res, error);
  }
};

const updateNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = req.body;

    const doc = await model.findById({ _id: parseId(id) });
    if (!doc)
      return res.send(
        { message: "La noticia que desea actualizar no existe" },
        204
      );

    if (req.file && req.file.filename) {
      news.imgURL = req.file.filename;
      unlink(path.resolve("./uploads/" + doc.imgURL));
    } else {
      news.imgURL = notice.imgURL;
    }

    await model.updateOne({ _id: parseId(id) }, news, (err, doc) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
      } else {
        res.status(200).send(doc);
      }
    });
  } catch (error) {
    httpError(res, error);
  }
};

const deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res.send(
        { message: "La noticia que desea eliminar no existe" },
        204
      );

    if (doc.imgURL != "ifgf.png") {
      unlink(path.resolve("./uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
  fileUpload,
};
