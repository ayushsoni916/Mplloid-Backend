const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

connectDB().then(()=>console.log("db connected")).catch((err)=>console.log("err",err))

const app = express();

const PORT = process.env.PORT || 5000
app.listen(PORT , ()=>console.log(`server is listening on ${PORT}`))