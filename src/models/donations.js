const mongoose = require("mongoose");

const DonationsScheme = new mongoose.Schema(
  {
    id_user: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: false,
    },
    direction: {
      type: String,
      required: false,
    },
    dateDelivery: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
