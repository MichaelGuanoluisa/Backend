const mongoose = require("mongoose");

const QuestionaryScheme = new mongoose.Schema(
  {
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
    },
    opcionD: {
      type: String,
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

module.exports = mongoose.model("Questionaries", QuestionaryScheme);
