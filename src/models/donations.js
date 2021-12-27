const mongoose = require('mongoose');

const DonationsScheme = new mongoose.Schema(
    {
      id_user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
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
      },
      direction: {
        type: String
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
  
  module.exports = mongoose.model("donation", DonationsScheme);