const mongoose = require('mongoose');

const NewsScheme = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        imgURL: {
            type: String,
            required: true
        }

    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('News', NewsScheme);