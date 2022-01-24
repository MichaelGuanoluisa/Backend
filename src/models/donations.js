const mongoose = require("mongoose");

const DonationsScheme = new mongoose.Schema(
  {
    user_id: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "undefined",
    },
    message: {
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

module.exports = mongoose.model("donation", DonationsScheme);
