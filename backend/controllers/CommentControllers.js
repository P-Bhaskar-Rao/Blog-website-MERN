const Comment = require("../models/CommentModel");
const { errorHandler } = require("../utils/error");
const createComment = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(401, "You must be signed in to comment", false));
  }

  const { content, postId, userId } = req.body;
  if (userId !== req.user.id) {
    return next(
      errorHandler(403, "You are not allowed to comment on this post", false)
    );
  }
  try {
    const comment = new Comment({
      content,
      userId,
      postId,
    });
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    return res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

const getAllComments=async(req,res,next)=>{
  if(!req.user.isAdmin){
    return next(errorHandler(403,'You are not allowed get all the comments',false))
  }
  const startIdx=parseInt(req.query.startIdx) || 0;
  const limit=parseInt(req.query.limit) || 9;
  const sortDirection=req.query.sort==='asc'?1:-1
  try {
    const comments=await Comment.find().sort({createdAt:sortDirection}).skip(startIdx).limit(limit)
    const totalComments=await Comment.countDocuments()
    const now=new Date()
    const lastMonth=new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate(),
    )
    const lastMonthComments=await Comment.countDocuments({createdAt:{$gte:lastMonth}})
    return res.status(200).json({comments,totalComments,lastMonthComments})
  } catch (error) {
    return next(error)
  }
}

const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found", false));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "no comment found", false));
    }
    if (req.user.id !== comment.userId && !req.user.isAdmin) {
      return next(
        errorHandler(403, "you are not allowed to edit this comment", false)
      );
    }
    const editedComment=await Comment.findByIdAndUpdate(
        req.params.commentId,{
            content:req.body.content
        },
        {new:true}
    )
    return res.status(200).json(editedComment)
  } catch (error) {
    return next(error);
  }
};


const deleteComment=async(req,res,next)=>{

try {
    const comment=await Comment.findById(req.params.commentId)
    if(!comment){
        return next(errorHandler(404,'comment not found',false))
    }
    if(comment.userId!==req.user.id && !req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed delete this comment',false))
    }
    await Comment.findByIdAndDelete(req.params.commentId)
    return res.status(200).json('comment deleted successfully')
} catch (error) {
   next(error) 
}
}

module.exports = {
  createComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
  getAllComments
};
