const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate-v2');


const InscriptionScheme = new mongoose.Schema(
    {
        user_id: {
            ref: "users",
            type: mongoose.Schema.Types.ObjectId
        },
        event_id: [{
            ref: "events",
            type: mongoose.Schema.Types.ObjectId
        }]

    },
    {
        versionKey: false,
        timestamps: true
    }
)




//UserScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("EventInscriptions", InscriptionScheme);