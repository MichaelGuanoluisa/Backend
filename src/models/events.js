const mongoose = require("mongoose");

const EventsScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
    },
    ubication: {
      type: String,
      require: true,
    },
    schedule: {
      type: String,
      require: true,
    },
    cost: {
      type: Number,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", EventsScheme);