//const mongoose = require("mongoose")

const router = require("express").Router()
const{createdPlayer,verify, loginPlayer, forgetPassword,resetPassword}= require("../Controller/userController.js")

router.post("/createdPlayer",createdPlayer)
router.get("/verify/:id/:token", verify)
router.post("/loginPlayer", loginPlayer)
router.post("/forgot",forgetPassword)
router.put("/reset",resetPassword)




module.exports=router

