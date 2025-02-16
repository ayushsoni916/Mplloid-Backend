const express = require("express")
const { addCourse, getCourses, getSubCourses, deleteSubCourse, deleteCourse } = require("../controllers/course.controller")

const router = express.Router()

router.post("/addCourse",addCourse)
router.get("/getCourse",getCourses)
router.get("/getSubCourses",getSubCourses)
router.get("/deleteSubCourses",deleteSubCourse)
router.get("/deleteCourse",deleteCourse)

module.exports = router