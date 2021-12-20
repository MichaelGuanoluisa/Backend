const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const eventModel = require("../models/events");
const inscription = require("../models/eventsInscriptions");
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
      } else {
        return next();
      }
    });
  };


exports.createInscription = async (req, res) => {
    try {
      const token = req.headers["x-access-token"];
      const data = req.body;
      console.log(data)
  
      const event = await eventModel.findById({ _id: parseId(data.event) });
      console.log(event)
      
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      user_id = decoded.id;
      data.user_id = user_id;
      console.log(user_id)
  
      if(!event){
        res.status(404).send({message: "El evento no se ha encontrado"})
      }else{
        if (req.file && req.file.filename) {
          data.imgURL = req.file.filename;
          console.log("si existe el url");
        } else {
          data.imgURL = "prueba.png";
        }
        inscription.create(data, (err, docs) => {
          if (err) {
            console.log("Error", err);
            res.send({ error: "Error" }, 422);
          } else {
            res.send({ message: "inscripcion a evento correctamente" });
          }
        });
      }
  
    } catch (error) {
      res.status(500).send({message: error})
    }
  }
  
  exports.getInscriptions = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        console.log(token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        id = decoded.id;
        console.log(id)
    
        docs = await inscription.find({user_id: parseId(id)});
        if(!docs){
            res.status(400).send({message: "no se encontraron inscripciones"})
        }else{
            res.status(200).send(docs)
        }
    } catch (error) {
        res.status(500).send({error: error})
    }
    
  
  };
  
  exports.getAllInscriptions = (req, res) => {
    inscription.find({}, (err, docs) => {
      res.send(docs);
    });
  }
  