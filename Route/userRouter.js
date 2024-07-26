//const mongoose = require("mongoose")
const router = require("express").Router()
const{createdPlayer,verify, loginPlayer}= require("../Controller/userController.js")

router.post("/createdPlayer",createdPlayer)
router.get("/verify/:id/:token", verify)
router.post("/loginPlayer", loginPlayer)




module.exports=router

