const Comment = require('../models/CommentModel')
const {errorHandler}=require('../utils/error')
const createComment=async(req,res,next)=>{
    if(!req.user){
        return next(errorHandler(401,'You must be signed in to comment',false))
    }

    const {content,postId,userId}=req.body
    if(userId!==req.user.id){
        return next(errorHandler(403,'You are not allowed to comment on this post',false))
    }
    try {
        const comment=new Comment({
            content,userId,postId
        })
        await comment.save()
        return res.status(201).json(comment)
    } catch (error) {
        next(error)
    }
}

module.exports={
    createComment
}