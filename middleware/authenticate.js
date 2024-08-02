const playersModel = require("../Model/userModel")
const playerModel = require("../Model/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const authenticate = async(req,res,next)=>{
try {
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(400).json({
            message:"invalid authorization"
        })
    }
const token = authorization.split(" ")[1]
if (!token){
    return res.status(404).json({
        message:"unauthorize, token not found"
    })
}
const decodeToken = jwt.verify(token, process.env.secret)

const user = await playersModel.findById(decodeToken.userId)

if(!user){
    return res.status(400).json({
        message:"not authorize, user not found"

    })
}
req.user = decodeToken
next()


} catch (error) {
    if(error instanceof jwt.JsonWebTokenError){
        return res.status(501).json({
            message:"session timeout, please login to continue"

        })
    }
    return res.status(500).json({
        message:"internal server error" + error.message

    })
}
}

module.exports = authenticate