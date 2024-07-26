const playersModel = require("../Model/userModel")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendMail = require("../helper/email")
const emailTemplate = require("../helper/html")

exports.createdPlayer = async(req,res)=>{
    try {
        const {playerName,playerAge,playerEmail,playerPassword,playerCountry} = req.body
        const playerEmailExist = await playersModel.findOne({playerEmail:playerEmail.toLowerCase()})
        if(playerEmailExist){
            res.status(400).json({
                message: "user with email already exist"
            })
        }
        const bcryptpassword = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(playerPassword,bcryptpassword)

        const data = {
            playerName,
            playerAge,
            playerEmail:playerEmail.toLowerCase(),
            playerPassword:hashedPassword,
            playerCountry,
        }
        const createdPlayer = await playersModel.create(data);

// to generate token for the player with the  id and save in the database
        const newToken = jwt.sign({
            userId:createdPlayer._id,email:playerEmail
        },process.env.secret,{expiresIn:"900s"})
        createdPlayer.token = newToken
        await createdPlayer.save()
        //const link = "http://localhost:2121/api/v1/verify/createdPlayer._id/newToken"
        const link = `${req.protocol}://${req.get("host")}/api/v1/verify/${createdPlayer._id}/${newToken}`
        const subject = "verify email account"
        const html = emailTemplate(link,playerName)
        sendMail({
            email:playerEmail,
            subject,
            html
        })

       return  res.status(201).json({
            message:`Welcome ${playerName} kindly check your gmail to access the link to verify your email`,
            data:createdPlayer
        })



    } catch (error) {
    return res.status(500).json({
        message:  "internal server error " + error.message
    })
    }
} 

//verfiying a user
exports.verify = async(req,res)=>{
try {
    const token = req.params.token
    const id = req.params.id
    const player = await playersModel.findById(id)
    if(!player){
        res.status(404).json({
message:"player is not found"
        })
    }
    jwt.verify(token,process.env.secret)
    const updatePlayer = await playersModel.findByIdAndUpdate(id,{isVerified:true},{new:true})
    if (!updatePlayer){
        res.status(404).json({
        message:"update not successfully"
    })
}

return res.send("verification successful")
} catch (error) {
    res.status(500).json({
        message: "internal server error" + error.message
    })
}
}


// function to login a player

exports.loginPlayer = async (req, res)=>{
    try {
        const {playerEmail,playerPassword}=req.body
        //can not be leave empty, must be fill by the user
        if(!playerEmail  || !playerPassword){
            return res.status(400).json({
                message: "please input the player email or password"
            })
        }

const checkEmail=await playersModel.findOne({playerEmail:playerEmail})

if(!checkEmail){
    return res.status(404).json({
        message:"player not found"
    }
    )
}

const checkPassword = await bcrypt.compareSync(playerPassword, checkEmail.playerPassword)
if(!checkPassword){
   return res.status(404).json({
        massage:"incorrect password"
    })
}
    const token = jwt.sign({
        userId:checkEmail._id,email:checkEmail.playerEmail
        },process.env.secret,{expiresIn:"2days"})
        checkEmail.token = token

        await checkEmail.save()
       return res.status(200).json({
            message:`Welcome ${checkEmail.playerName} you have succesfully login to our page, how can we be of help to you today`,
            data:checkEmail
        })
    



    } catch (error) {
      return  res.status(500).json({
            message: "internal server error" + error.message
        })
    }
}

//forget password

exports.forgetPassword = async(req, res)=>{
    try {
      const {playerEmail} = req.body  
      if (!playerEmail) {
        res.status(400).json({
            message: "please input your email address"
        })
      }

      const checkEmail = await playersModel .findOne({playerEmail:playerEmail})
      if(!checkEmail){
        res.status(404).json({
            message:"Email not found"
        })
      }

      res.status()


    } catch (error) {
      return  res.status(500).json({
         message:"internal server error" + error.message
        })
    }
}

