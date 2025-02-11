const mongoose = require("mongoose")

const examModel = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true,
        enum : ["govt",'pvt'],
    },
    icon:{
        type:String,
        require:true,      
    },
    desHome:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true,
    },
    process:{
        type:String,
        require:true
    },
    announceDate:{
        type:String,
        require:true,
    },
    startDate:{
        type:String,
        require:true
    },
    lastDate:{
        type:String,
        require:true
     }
})

module.exports = mongoose.model("exam",examModel)