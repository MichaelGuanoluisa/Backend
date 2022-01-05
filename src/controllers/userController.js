const mongoose = require("mongoose");
const model = require("../models/users");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createUsers = (req, res) => {
  const data = req.body;
  model.create(data, (err, docs) => {
    if (err) {
      console.log("Error", err);
      res.status(422).send({ error: "Error" });
    } else {
      res.status(201).send(docs);
    }
  });
};

exports.getUsersById = async (req, res) => {
  const id = req.params.id;
  const user = await model.findById({ _id: parseId(id) });
  if (!user) {
    res.status(204).send({});
  } else {
    res.status(200).send(user);
  }
};

exports.updateUsersById = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  //const { id } = req.params
  model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
    res.send(docs);
  });
};

exports.deleteUsersById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
};
