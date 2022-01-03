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

exports.createNews = async (req, res) => {
  
  try {

    const doc = await model.findOne({title: data.title})
    if(doc) return res.send({message: "La noticia ya existe"}, 400)

    const data = req.body;
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
        res.status(201).send({ docs });
      }
    });

  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.getNews = async (req, res) => {
  try {

    const news = await model.find({});
    if (news == null) {
      res.status(204).send({});
    } else {
      res.status(204).send(news);
    }

  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.getNewsById = async (req, res) => {
  try {

    const id = req.params.id;
    const news = await model.findById({ _id: parseId(id) });
    if (news == null) {
      res.status(204).send({});
    } else {
      res.status(204).send(news);
    }

  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.updateNewsById = async (req, res) => {
  
  try {
    const id = req.params.id;
    const news = req.body;

    const doc = await model.findById({ _id: parseId(id) });
    if(!doc) return res.send({message: "La noticia no existe"}, 400)

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
      res.send({doc}, 201);
      }
    });
    
  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if(!doc) return res.send({message: "La noticia no existe"}, 400)

    if(doc.imgURL != "ifgf.png"){
      unlink(path.resolve("./uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error }, 500);
  }
};
