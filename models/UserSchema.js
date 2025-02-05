const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",
          ],
    },
    phone:{
        type:String,
        require:true,
        unique:true,
    },
    deviceKey:{
        type:String,
        require:true
    }
} , {timestamps:true})

module.exports = mongoose.model("User",UserSchema)