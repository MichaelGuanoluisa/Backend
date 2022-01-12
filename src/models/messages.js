const mongoose = require("mongoose");

const MessagesScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "el titulo es necesario"],
    },
    description: {
      type: String,
      required: [true, "la description es necesario"],
    },
    imgURL: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessagesScheme);
