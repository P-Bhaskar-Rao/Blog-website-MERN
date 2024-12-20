const Post = require("../models/PostModel")
const { errorHandler } = require("../utils/error")

const createPost = async (req, res,next) => {
    console.log(req.body)
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post',false))
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"please provide all required fields",false))
    }
    const slug=req.body.title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-]/g,'-')
    const newPost=new Post({...req.body,slug,userId:req.user.id})
    try {
        const savedPost=await newPost.save()
        return res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPost,
}
