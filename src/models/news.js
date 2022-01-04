const mongoose = require("mongoose");

const NewsScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
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

module.exports = mongoose.model("News", NewsScheme);
