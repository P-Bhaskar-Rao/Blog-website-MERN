const express=require("express")
const multer=require("multer")

const { verifyUser } = require("../utils/verifyUser.js")
const { addProfileImage,addPostImage } = require("../controllers/UploadControllers.js")
const uploadRoutes=express.Router()
const upload=multer({dest:"uploads/profiles"})
uploadRoutes.post('/add-profile-image/:userId',verifyUser,upload.single("profile-image"),addProfileImage)
uploadRoutes.post('/add-post-image/:userId',verifyUser,upload.single("post-image"),addPostImage)
module.exports={
    uploadRoutes,
}