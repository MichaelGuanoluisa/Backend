const mongoose = require("mongoose");
const model = require("../models/questionary");

const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

exports.createQuestionary = (req, res) => {
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

exports.getQuestionary = (req, res) => {
  model.find({}, (err, docs) => {
    res.send(docs);
  });
};

/*exports.getVideosById = async (req, res) => {
  const id = req.params.id;
  const news = await model.findById({ _id: parseId(id) });
  if (news == null) {
    res.status(200).send("null");
  } else {
    res.status(200).send(news);
  }
};
*/

exports.updateQuestionaryById = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  //const { id } = req.params
  model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
    res.send(docs);
  });
};

exports.deleteQuestionaryById = (req, res) => {
  const id = req.params.id;
  //const { id } = req.params
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    res.send(docs);
  });
  
};

exports.deleteAllQuestionary = (req, res) => {
    model.deleteMany({}, (err, docs) => {
        res.send(docs);
      });
}
