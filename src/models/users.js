const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const mongoosePaginate = require('mongoose-paginate-v2');


const UserScheme = new mongoose.Schema(
    {
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
        cellphone: {
            type: String,
            unique: true,
            required: [true, 'El número celular es necesario']
        },
        password:{
            type: String,
            required: [true, 'La contraseña es necesaria']
        },
        roles: [{
            ref: "role",
            type: mongoose.Schema.Types.ObjectId
        }]

    },
    {
        versionKey: false,
        timestamps: true
    }
)

exports.encryptPassword = UserScheme.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

exports.comparePassword = UserScheme.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}


//UserScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("user", UserScheme);