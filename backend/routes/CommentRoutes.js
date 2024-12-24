const express=require('express')
const { createComment, getComments, likeComment } = require('../controllers/CommentControllers')
const { verifyUser } = require('../utils/verifyUser')
const commentRoutes=express.Router()
commentRoutes.post('/create',verifyUser,createComment)
commentRoutes.get('/get/:postId',getComments)
commentRoutes.put('/like-comment/:commentId',verifyUser,likeComment)
module.exports=commentRoutes