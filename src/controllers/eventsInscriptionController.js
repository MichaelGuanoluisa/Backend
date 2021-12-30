const mongoose = require("mongoose");
const eventModel = require("../models/events");
const inscription = require("../models/eventsInscriptions");
const multer = require("multer");
const multerConfig = require("../libs/multerConfig");
const auth = require("./authController");
const userModel = require("../models/users");

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

      const event = await eventModel.findById({ _id: parseId(data.event_id) });
      
      if(!event) return res.status(403).send({message: "evento no encontrado"})

      const decoded = await auth.decoded(token)
      data.user_id = decoded.id;
      
      //comprobar si existen usuarios ya registrados en un evento
      docs = await inscription.find({event_id: parseId(data.event_id)});
      if(docs.user_id === data.user_id) return res.status(403).send({message: "usuario ya registrado al evento"})

      inscription.create(data, (err, docs) => {
        if (err) {
          console.log("Error", err);
          res.send({ error: "Error" }, 422);
        } else {
          res.send({ message: "inscripcion a evento correctamente" });
        }
      });
  
    } catch (error) {
      res.status(500).send({message: error})
    }
  }
  
  exports.getInscriptions = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decoded = auth.decoded(token)
        
        docs = await inscription.find({user_id: parseId(decoded.id)});
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

  exports.deleteInscriptionById = (req, res) => {
    const id = req.params.id;
    //const { id } = req.params
    inscription.deleteOne({ _id: parseId(id) }, (err, docs) => {
      if(err){
        res.send({error: err})
      }else{
        res.send({message: "borrado con exito"});
      }
    });
  };
  