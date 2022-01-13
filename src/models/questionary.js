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
          optionA: { type: String, required: true },
          optionB: {
            type: String,
            required: true,
          },
          optionC: {
            type: String,
            required: false,
          },
          optionD: { type: String, required: false },
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
