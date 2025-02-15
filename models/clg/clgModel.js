const mongoose = require("mongoose")

const clgModel = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        require:true,
    }
})