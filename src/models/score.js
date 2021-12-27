const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate-v2');


const ScoreScheme = new mongoose.Schema(
    {
        user_id: {
            ref: "users",
            type: mongoose.Schema.Types.ObjectId
        },
        nickname: {
            type: String,
            required: true
        },
        questionary_name: {
            ref: "questionary",
            type: mongoose.Schema.Types.String
        },
        score:{
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)




//UserScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("Score", ScoreScheme);