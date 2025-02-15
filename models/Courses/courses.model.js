const mongoose = require("mongoose")

const couserseSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    subCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subCourse"
        }
    ]
})

module.exports = mongoose.model("Course",couserseSchema)