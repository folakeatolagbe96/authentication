
const mongoose = require("mongoose")

const playersSchema = new mongoose.Schema({
    playerName:{
        type: String,
        required: ["true, playerName is required"]
    },
    playerAge:{
        type: Number,
        required: ["true, playerAge is required"]
    },
    playerEmail:{
        type: String,
        required: ["true, playerEmail is required"]
    },
    playerPassword:{
        type:String
    },
    playerCountry:{
        type: String,
        required: ["true, playerCountry is required"]
    },
    token:{
        type: String,
    },
    isVerified:{
     type:Boolean,
     default:false
    },
},{timeStamps:true})

const playersModel = mongoose.model("player", playersSchema)

module.exports = playersModel