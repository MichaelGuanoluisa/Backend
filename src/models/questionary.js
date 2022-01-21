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
          options: [{type: String}],
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
