const express=require('express')
const { createComment, getComments, likeComment, editComment, deleteComment, getAllComments } = require('../controllers/CommentControllers')
const { verifyUser } = require('../utils/verifyUser')
const commentRoutes=express.Router()
commentRoutes.post('/create',verifyUser,createComment)
commentRoutes.get('/get/:postId',getComments)
commentRoutes.get('/get-comments',verifyUser,getAllComments)
commentRoutes.put('/like-comment/:commentId',verifyUser,likeComment)
commentRoutes.put('/edit-comment/:commentId',verifyUser,editComment)
commentRoutes.delete('/delete-comment/:commentId',verifyUser,deleteComment)

module.exports=commentRoutes