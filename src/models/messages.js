const mongoose = require('mongoose');

const MessagesScheme = new mongoose.Schema({
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        imgURL:{
            type: String,
            required: false
        }

    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('Messages', MessagesScheme);