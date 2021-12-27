const mongoose = require("mongoose");
const model = require("../models/score");
const auth = require("./authController");
const userModel = require("../models/users");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createScore = async (req, res) => {
  const data = req.body;
  const token = req.headers["x-access-token"];
  try {
    const decode = auth.decoded(token);
    //const user = await userModel.findById(decode.id, { password: 0 })
    data.user_id = decode.id

        await model.create(data, (err, docs) => {
            res.status(201).send({message: "puntaje creado correctamente"});
          });
        
    
  } catch (error) {
    res.status(500).send({ error: error });
    
  }
  
};

exports.getScore = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

exports.getScoreById = async (req, res) => {
  const id = req.params.id;
  const news = await model.findById({ _id: parseId(id) });
  if (news == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(news);
  }
};

exports.updateScoreById = (id, data) => {
  //const { id } = req.params
  model.updateOne({ _id: parseId(id) }, data, (err, docs) => {
    res.send({message: "se actualizo correctamente"});
  });
};

exports.deleteScoreById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
};
