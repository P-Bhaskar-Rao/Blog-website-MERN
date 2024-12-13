const express=require("express")
const multer=require("multer")
const { addProfileImage } = require("../controllers/Usercontrollers")
const { verifyToken } = require("../utils/generateJwtToken.js")
const uploadRoutes=express.Router()
const upload=multer({dest:"uploads/profiles"})
// uploadRoutes.post('/profile',upload.single("profile-image"),addProfileImage)

module.exports={
    uploadRoutes,
}