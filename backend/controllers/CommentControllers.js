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

const getComments=async(req,res,next)=>{
    try {
        const comments=await Comment.find({postId:req.params.postId}).sort({createdAt:-1})
        return res.status(200).json(comments)
    } catch (error) {
        return next(error)
    }
}

const likeComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404,'Comment not found',false))
        }
        const userIndex=comment.likes.indexOf(req.user.id)
        if(userIndex===-1){
            comment.numberOfLikes+=1;
            comment.likes.push(req.user.id)
        }else{
            comment.numberOfLikes-=1
            comment.likes.splice(userIndex,1)
        }
        await comment.save()
        return res.status(200).json(comment)
    } catch (error) {
        return next(error)
    }
}

module.exports={
    createComment,
    getComments,
    likeComment
}