const express = require("express")
const { addCourse, getCourses, getSubCourses } = require("../controllers/course.controller")

const router = express.Router()

router.post("/addCourse",addCourse)
router.get("/getCourse",getCourses)
router.get("/getSubCourses",getSubCourses)

module.exports = router