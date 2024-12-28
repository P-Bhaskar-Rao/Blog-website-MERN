import express from "express"
import multer from 'multer'

import verifyUser from "../utils/verifyUser.js"
import { addProfileImage,addPostImage } from "../controllers/UploadControllers.js"
const uploadRoutes=express.Router()
const upload=multer({dest:"uploads/profiles"})
uploadRoutes.post('/add-profile-image/:userId',verifyUser,upload.single("profile-image"),addProfileImage)
uploadRoutes.post('/add-post-image/:userId',verifyUser,upload.single("post-image"),addPostImage)
export default uploadRoutes