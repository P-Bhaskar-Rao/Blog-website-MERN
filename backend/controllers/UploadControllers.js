const { errorHandler } = require("../utils/error")
const fs=require('fs')
const addProfileImage=(req,res,next)=>{
    if(!req.file){
        return next(errorHandler(400,'No file uploaded',false))
    }
    let fileName=`uploads/profiles/${req.params.userId}-${Date.now()}-${req.file.originalname}`
    fs.renameSync(req.file.path,fileName)
    return next(errorHandler(200,fileName,true))
}

const addPostImage=(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post',false))
    }

    if(!req.file){
        return next(errorHandler(400,'No file uploaded',false))
    }
    let fileName=`uploads/posts/${req.params.userId}-${Date.now()}-${req.file.originalname}`
    fs.renameSync(req.file.path,fileName)
    return next(errorHandler(200,fileName,true))
}
module.exports={
    addProfileImage,
    addPostImage
}