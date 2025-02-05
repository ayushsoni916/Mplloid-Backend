const express = require("express")
const {addNotification,getNotification} = require("../controllers/notificationController")

const router = express.Router();

router.post("/send",addNotification)
router.get("/receive",getNotification)

module.exports = router

