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
      required: false,
    },
    location: {
      type: String,
      require: true,
    },
    schedule: {
      type: String,
      require: true,
    },
    cost: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    inscriptions: [
      {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", EventsScheme);
