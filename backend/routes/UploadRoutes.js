const express=require("express")
const multer=require("multer")

const { verifyUser } = require("../utils/verifyUser.js")
const { addProfileImage } = require("../controllers/UploadControllers.js")
const uploadRoutes=express.Router()
const upload=multer({dest:"uploads/profiles"})
uploadRoutes.post('/add-profile-image/:userId',verifyUser,upload.single("profile-image"),addProfileImage)

module.exports={
    uploadRoutes,
}