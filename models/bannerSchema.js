const mongoose = require("mongoose")

const bannerModel = new mongoose.Schema({
    bannerUrl:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model("Banner",bannerModel)