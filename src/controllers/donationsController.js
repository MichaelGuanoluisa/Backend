const mongoose = require("mongoose");
const model = require("../models/donations");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const { unlink } = require("fs-extra");
const { httpError } = require("../helpers/handleError");
const path = require("path");
const auth = require("./authController");
const validations = require("../validators/donation");

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
    const token = req.headers["x-access-token"];
    await validations.validate(req, res);

    const decoded = auth.decoded(token);
    data.user_id = decoded.id;

    if (req.file && req.file.filename) {
      data.imgURL = `${req.file.filename}`;
    } else {
      data.imgURL = "ifgf.png";
    }
    data.status = "undefined";

    await model.create(data, (err, doc) => {
      if (err) {
        console.log("Error", err);
        res
          .status(422)
          .send({ error: "El formato de datos ingresado es erroneo" });
      } else {
        res.status(201).send(doc);
      }
    });
  } catch (error) {
    httpError(res, error);
  }
};

exports.getDonations = async (req, res) => {
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

exports.getDonationsById = async (req, res) => {
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

exports.updateDonationsById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await validations.validateUpdate(req, res);

    const donation = await model.findById({ _id: parseId(id) });
    if (!donation) {
      if(req.file.filename){
        unlink(path.resolve("./public/uploads/" + req.file.filename));
      }
      return res
        .status(404)
        .send({ message: "La donacion que desea actualizar no existe" });
    }

    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
      unlink(path.resolve("./public/uploads/" + donation.imgURL));
    } else {
      body.imgURL = donation.imgURL;
    }

    await model.updateOne({ _id: parseId(id) }, body);
    const doc = await model.findById({ _id: parseId(id) });
    res.status(200).send(doc);

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
        404
      );

    if (doc.imgURL != "ifgf.png") {
      unlink(path.resolve("./public/uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    httpError(res, error);
  }
};
