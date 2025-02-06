const express = require("express")
const {addBlog ,getAllBlogs, getBlog} = require("../controllers/blogController")

const router = express.Router()

router.post("/addBlog",addBlog)
router.get("/getBlog",getAllBlogs)
router.get("/getBlogDetail",getBlog)

module.exports = router 