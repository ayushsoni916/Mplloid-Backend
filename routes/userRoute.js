const express = require("express")
const {createUser, login} = require("../controllers/UserController")

const router = express.Router();

router.post("/signin",createUser)
router.post("/login",login)

module.exports = router