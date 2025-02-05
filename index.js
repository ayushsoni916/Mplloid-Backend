const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoute = require("./routes/userRoute")
const bannerRoute = require("./routes/bannerRoute")

dotenv.config()

connectDB().then(()=>console.log("db connected")).catch((err)=>console.log("err",err))

const app = express();
app.use(express.json())

//Routes

// user route
app.use("/api/user",userRoute)

//banner route
app.use("/api/banner",bannerRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT , ()=>console.log(`server is listening on ${PORT}`))