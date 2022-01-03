const mongoose = require("mongoose");
const model = require("../models/videos");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createVideos = async (req, res) => {

  try {
    const data = req.body;

    if(data.type == "niños" || data.type == "jovenes" || data.type == "general"){

      const doc = await model.findOne({url: data.url})
      if(doc) return res.send({message: "El video ya existe"}, 400)

      await model.create(data, (err, docs) => {
        if (err) {
          console.log("Error", err);
          res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
        } else {
          res.status(201).send({ docs });
        }
      });

    }else{
      res.status(404).send({message: "solo puede ser de 3 tipos: niños, jovenes y general"})
    }
    
  } catch (error) {
    res.status(500).send({ error: error });
    
  }
  
};

exports.getVideos = (req, res) => {
  try {

    const docs = await model.find({});
    if (docs == null) {
      res.status(204).send({});
    } else {
      res.status(204).send(docs);
    }

  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.getVideosById = async (req, res) => {
  try {

    const id = req.params.id;
    const doc = await model.findById({ _id: parseId(id) });
    if (doc == null) {
      res.status(204).send({});
    } else {
      res.status(204).send(doc);
    }

  } catch (error) {
    res.send({ message: error }, 500);
  }
};

exports.updateVideosById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const video = await model.findById({ _id: parseId(id) });
    if(!video) return res.send({message: "El video que desea actualizar no existe"}, 400)

    await model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "El formato de datos ingresado es erroneo" }, 422);
      } else {
      res.send({docs}, 201);
      }
    });
    
  } catch (error) {
    res.send({ message: error }, 500);

  }
};

exports.deleteVideosById = (req, res) => {
  try {
    const id = req.params.id;
    
    const video = await model.findById({ _id: parseId(id) });
    if(!video) return res.send({message: "El video que desea borrar no existe"}, 400)

    model.deleteOne({ _id: parseId(id) }, (err, docs) => {
      if (err) {
        console.log("Error", err);
        res.send({ error: "error" }, 422);
      } else {
      res.send({docs}, 201);
      }
    });

  } catch (error) {
    res.send({ message: error }, 500);
  }
};
