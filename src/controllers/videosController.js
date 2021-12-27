const mongoose = require("mongoose");
const model = require("../models/videos");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createVideos = (req, res) => {
  const data = req.body;
  const {title, description, type, url} = data;
  try {
    if(type == "niños" || type == "jovenes" || type == "general"){
      model.create(data, (err, docs) => {
        res.status(201).send({message: "video creado correctamente"});
      });
    }else{
      res.status(404).send({message: "solo puede ser de 3 tipos: niños, jovenes y general"})
    }
    
  } catch (error) {
    res.status(500).send({ error: error });
    
  }
  
};

exports.getVideos = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getVideosById = async (req, res) => {
  const id = req.params.id;
  const news = await model.findById({ _id: parseId(id) });
  if (news == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(news);
  }
};

exports.updateVideosById = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  //const { id } = req.params
  model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
    res.send(docs);
  });
};

exports.deleteVideosById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
};
