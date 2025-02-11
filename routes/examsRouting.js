const express = require("express")
const { getFeaturedExams, addExam, getPvtExams, getGovtExams, deleteExam } = require("../controllers/examsController")

const router = express.Router()

router.post("/addExams",addExam)
router.get("/getFeaturedExams",getFeaturedExams)
router.get("/getGovtExams",getGovtExams)
router.get("/getPvtExams",getPvtExams)
router.delete("/deleteExam",deleteExam)

module.exports = router