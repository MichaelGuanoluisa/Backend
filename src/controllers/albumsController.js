const mongoose = require("mongoose");
const model = require("../models/album");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const path = require("path");
const { httpError } = require("../helpers/handleError");
const validations = require("../validators/info");
const fs = require("fs");

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

exports.createAlbums = async (req, res) => {
  try {
    const data = req.body;
    const errors = validations.validate(req);

    if (errors) {
      return res.status(406).send(errors);
    } else {
      const doc = await model.findOne({ title: data.title });
      if (doc) {
        deleteImage(req);
        return res.status(400).send({ message: "La foto ya existe" });
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

exports.getAlbums = async (req, res) => {
  try {
    const docs = await model.find({});
    if (!docs) {
      res.status(404).send({});
    } else {
      res.status(200).send(docs);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findById({ _id: parseId(id) });
    if (!doc) {
      res.status(404).send({});
    } else {
      res.status(200).send(doc);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.updateAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const errors = validations.validateUpdate(req);

    if (errors) {
      return res.status(406).send(errors);
    } else {
      const album = await model.findById({ _id: parseId(id) });

      if (!album) {
        deleteImage(req);
        return res
          .status(404)
          .send({ message: "La foto que desea actualizar no existe" });
      }
      const doc1 = await model.findOne({ title: body.title });
      if (doc1) {
        deleteImage(req);
        return res.status(406).send({ message: "La foto ya existe" });
      }

      if (req.file && req.file.filename) {
        body.imgURL = req.file.filename;
        if (album.imgURL != "ifgf.png") {
          if (fs.existsSync(path.resolve("./public/uploads/" + album.imgURL))) {
            unlink(path.resolve("./public/uploads/" + album.imgURL));
          }
        }
      } else {
        body.imgURL = album.imgURL;
      }

      await model.updateOne({ _id: parseId(id) }, body);
      const doc = await model.findById({ _id: parseId(id) });
      return res.status(200).send(doc);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.deleteAlbumsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res
        .status(404)
        .send({ message: "La foto que desea borrar no existe" });

    if (doc.imgURL != "ifgf.png") {
      if (fs.existsSync(path.resolve("./public/uploads/" + doc.imgURL))) {
        unlink(path.resolve("./public/uploads/" + doc.imgURL));
      }
    }
    res.status(200).send({ message: "Eliminado con éxito" });
  } catch (error) {
    httpError(res, error);
  }
};

function deleteImage(req) {
  if (req.file?.filename) {
    unlink(path.resolve("./public/uploads/" + req.file?.filename));
  }
}
