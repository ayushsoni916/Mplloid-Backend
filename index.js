const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoute = require("./routes/userRoute")
const bannerRoute = require("./routes/bannerRoute")
const notificationRoute = require("./routes/notificationRoute")
const blogRoute = require("./routes/blogRoute")
const examRouter = require("./routes/examsRouting")
const CourseRouter = require("./routes/course.route")

dotenv.config()
console.log("mongoUrl",process.env.MONGO_URL)
connectDB().then(()=>console.log("db connected")).catch((err)=>console.log("err",err))

const app = express();
app.use(express.json())

//Routes

// user route
app.use("/api/user",userRoute)

//banner route
app.use("/api/banner",bannerRoute)

//notification
app.use("/api/notification",notificationRoute)

//blogs
app.use("/api/blog",blogRoute)

//Exams
app.use("/api/exams",examRouter)

//Courses
app.use("/api/courses",CourseRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT , ()=>console.log(`server is listening on ${PORT}`))