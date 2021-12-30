const mongoose = require("mongoose");
const model = require("../models/donations");
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

exports.createDonations = (req, res) => {
  const data = req.body;
  const { name, lastName, description, type, delivery, direction, dateDelivery, imgURL } = data;
  //crear un dato album en la base de datos

  try {

    if (type == "comida" || type == "ropa" || type == "dinero"){

      const newDonations = new model({
        name, lastName, description, type, delivery, direction, dateDelivery });
      if (req.file && req.file.filename) {
        newDonations.imgURL = `${req.file.filename}`;
      }else{
        newDonations.imgURL = "ifgf.png";
      }

      newDonations.save();
      res.send({ message: "registro de donación correctamente" });

    }else{
      res.status(404).send({message: "solo puede ser de 3 tipos: comida, ropa o dinero"})
    }
    
  } catch (error) {
    res.send({ message: error });
  }
};

exports.getDonations = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getDonationsById = async (req, res) => {
  const id = req.params.id;
  const product = await model.findById({ _id: parseId(id) });
  if (product == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(product);
  }
};

exports.updateDonationsById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const donation = await model.findById({ _id: parseId(id) });
    if (req.file && req.file.filename) {
      body.imgURL = req.file.filename;
      unlink(path.resolve("./uploads/" + donation.imgURL));
    } else {
      body.imgURL = donation.imgURL;
    }
    model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      res.send({ message: "Donación actualizada correctamente" });
    });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.deleteDonationsById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await model.findOneAndDelete({ _id: parseId(id) });
    if(!doc.imgURL === "ifgf.png"){
      unlink(path.resolve("./uploads/" + doc.imgURL));
    }
    res.send({ message: "Eliminado con exito" });
  } catch (error) {
    res.send({ message: error });
  }
};
