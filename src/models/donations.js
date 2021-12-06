const mongoose = require('mongoose');

const DonationsScheme = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true
      },
      type: {
          type: String,
          required: true
      },
      delivery: {
          type: String,
          required: true
      },
      direction: {
        type: String,
        required: true
      },
      dateDelivery: {
        type: String,
        required: true
      },
      imgURL: {
        type: String
      }
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Donation", DonationsScheme);