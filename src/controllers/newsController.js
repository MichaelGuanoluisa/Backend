const mongoose = require("mongoose");
const model = require("../models/news");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const { httpError } = require("../helpers/handleError");
const path = require("path");
const fs = require("fs");
const validations = require("../validators/info");

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

exports.createNews = async (req, res) => {
  try {
    const data = req.body;
    const errors = validations.validate(req, res);

    if (errors) {
      return res.status(406).send(errors);
    } else {
      const doc = await model.findOne({ title: data.title });
      if (doc) {
        if (req.file?.filename) {
          unlink(path.resolve("./public/uploads/" + req.file?.filename));
        }
        return res.status(400).send({ message: "La noticia ya existe" });
      }

      if (req.file && req.file.filename) {
        data.imgURL = `${req.file.filename}`;
      } else {
        data.imgURL = "ifgf.png";
      }
      await model.create(data, (err, docs) => {
        return res.status(201).send(docs);
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await model.find({});
    if (!news) {
      res.status(404).send({});
    } else {
      res.status(200).send(news);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await model.findById({ _id: parseId(id) });
    if (!news) {
      res.status(404).send({});
    } else {
      res.status(200).send(news);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.updateNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = req.body;
    const errors = validations.validateUpdate(req);

    if (errors) {
      return res.status(406).send(errors);
    } else {
      const doc = await model.findById({ _id: parseId(id) });
      if (!doc) {
        if (req.file?.filename) {
          unlink(path.resolve("./public/uploads/" + req.file?.filename));
        }
        return res
          .status(404)
          .send({ message: "La noticia que desea actualizar no existe" });
      }

      if (req.file && req.file.filename) {
        news.imgURL = req.file.filename;
        unlink(path.resolve("./public/uploads/" + doc.imgURL));
      } else {
        news.imgURL = doc.imgURL;
      }

      await model.updateOne({ _id: parseId(id) }, news);
      const response = await model.findById({ _id: parseId(id) });
      return res.status(200).send(response);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res
        .status(404)
        .send({ message: "La noticia que desea eliminar no existe" });

    if (doc.imgURL != "ifgf.png") {
      if (fs.existsSync(path.resolve("./public/uploads/" + doc.imgURL))) {
        unlink(path.resolve("./public/uploads/" + doc.imgURL));
      }
    }
    res.send({ message: "Eliminado con éxito" });
  } catch (error) {
    httpError(res, error);
  }
};
