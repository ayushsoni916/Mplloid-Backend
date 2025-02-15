const mongoose = require("mongoose")

const subCourses = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    }
})

module.exports = mongoose.model("subCourse",subCourses)