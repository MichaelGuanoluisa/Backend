const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate-v2');


const InscriptionScheme = new mongoose.Schema(
    {
        user_id: {
            ref: "users",
            type: mongoose.Schema.Types.ObjectId
        },
        name:{
            type: String,
            required: [true, 'El nombre es necesario']
        },
        lastname:{
            type: String,
            required: [true, 'El apellido es necesario']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'El correo es necesario']
        },
        imgURL:{
            type: String
        },
        event: [{
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
module.exports = mongoose.model("EventsInscriptions", InscriptionScheme);