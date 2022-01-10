const mongoose = require("mongoose");

const QuestionaryScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: {
          title: {
            type: String,
            required: true,
          },
          opcionA: { type: String, required: true },
          opcionB: {
            type: String,
            required: true,
          },
          opcionC: {
            type: String,
            required: true,
          },
          opcionD: { type: String, required: true },
          answer: { type: String, required: true },
        },
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Questionary", QuestionaryScheme);
