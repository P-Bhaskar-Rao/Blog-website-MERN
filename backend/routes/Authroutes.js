const express= require("express")
const { signup, signin, google } = require("../controllers/Authcontrollers")
const authRoutes=express.Router()
authRoutes.post('/signup',signup)
authRoutes.post('/signin',signin)
authRoutes.post('/google',google)
module.exports={
    authRoutes,
}