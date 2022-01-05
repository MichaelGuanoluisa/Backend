const mongoose = require("mongoose");
const model = require("../models/donations");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const { httpError } = require("../helpers/handleError");
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

exports.createDonations = async (req, res) => {
  try {
    const data = req.body;

    if (data.type == "comida" || data.type == "ropa" || data.type == "dinero") {
      if (req.file && req.file.filename) {
        data.imgURL = `${req.file.filename}`;
      } else {
        data.imgURL = "ifgf.png";
      }

      await model.create(data, (err, doc) => {
        if (err) {
          console.log("Error", err);
          res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
        } else {
          res.status(201).send(doc);
        }
      });
    } else {
      res
        .status(404)
        .send({ message: "solo puede ser de 3 tipos: comida, ropa o dinero" });
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.getDonations = async (req, res) => {
  try {
    const docs = await model.find({});
    if (!docs) {
      res.status(204).send({});
    } else {
      res.status(200).send(docs);
    }
  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.getDonationsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findById({ _id: parseId(id) });
    if (!doc) {
      res.status(204).send({});
    } else {
      res.status(200).send(doc);
    }
  } catch (error) {
    httpError(res, error);
  }
};

exports.updateDonationsById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const donation = await model.findById({ _id: parseId(id) });
    if (!donation)
      return res.send(
        { message: "La donacion que desea actualizar no existe" },
        204
      );

    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
      unlink(path.resolve("./uploads/" + donation.imgURL));
    } else {
      body.imgURL = donation.imgURL;
    }

    model.updateOne({ _id: parseId(id) }, body, (err, doc) => {
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

exports.deleteDonationsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if (!doc)
      return res.send(
        { message: "La donacion que desea borrar no existe" },
        200
      );

    if (doc.imgURL != "ifgf.png") {
      unlink(path.resolve("./uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};
