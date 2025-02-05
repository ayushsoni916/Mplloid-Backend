const mongoose = require("mongoose")

const notificationModel = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("notification",notificationModel)