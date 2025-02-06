const mongoose = require("mongoose")

const blogModel = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    clgType:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    des:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model("blog",blogModel)