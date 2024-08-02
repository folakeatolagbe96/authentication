//const mongoose = require("mongoose")
/// middleware is a function that have a req objec, response object and a next function


const router = require("express").Router()
const{createdPlayer,verify, loginPlayer, forgetPassword,resetPassword, signOut}= require("../Controller/userController.js")

const {authenticate} = require("../middleware/authenticate.js")



router.post("/createdPlayer",createdPlayer)
router.get("/verify/:id/:token", verify)
router.post("/loginPlayer", loginPlayer)
router.post("/forgot",forgetPassword)
router.put("/reset/:playerId/:token",resetPassword)
router.delete("/signout",authenticate, signOut)





module.exports=router

