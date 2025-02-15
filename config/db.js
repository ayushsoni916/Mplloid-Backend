const mongoose = require("mongoose")
require("dotenv").config();

async function connectDb(){
    // return mongoose.connect(process.env.MONGO_URL)
    return mongoose.connect("mongodb+srv://info:SeBIYLdnkM5f02pk@cluster0.xqc9z.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = connectDb