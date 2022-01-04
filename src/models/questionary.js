const mongoose = require("mongoose");

const QuestionaryScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    opcionA: {
      type: String,
      required: true,
    },
    opcionB: {
      type: String,
      require: true,
    },
    opcionC: {
      type: String,
      required: false
    },
    opcionD: {
      type: String,
      required: false
    },
    answer: {
        type: String,
        require: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Questionary", QuestionaryScheme);
