const mongoose = require('mongoose')

exports.Roles = ["user", "admin"];

const RoleScheme = new mongoose.Schema(
    {
        name:{
          type: String
        }
    },{
        versionKey: false
    }
)

module.exports = mongoose.model("role", RoleScheme);