const express = require("express")
const {addBanner, getBanners, deleteBanner} = require("../controllers/bannerController")

const router = express.Router();

router.post("/addBanner",addBanner)
router.get("/getBanner",getBanners)
router.delete("/deleteBanner",deleteBanner)

module.exports=router