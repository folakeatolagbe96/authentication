const express = require ("express")
const mongoose = require("mongoose")
const Route = require("./Route/userRouter")
require("dotenv").config()
const app = express()
app.use(express.json())


const url = process.env. dataBaseUrl
const port = process.env.port
app.get("/",(req,res)=>{
res.send("Welcome to Folake Racheal API")
})

app.use("/api/v1/",Route)

mongoose.connect(url).then(()=>{
    console.log("connection to databse successfully")
    app.listen(port,()=>{console.log (`app is connected to port ${port}`)})
}).catch((error)=>{
    console.log(error.message)
})