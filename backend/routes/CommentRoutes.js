const express=require('express')
const { createComment, getComments } = require('../controllers/CommentControllers')
const { verifyUser } = require('../utils/verifyUser')
const commentRoutes=express.Router()
commentRoutes.post('/create',verifyUser,createComment)
commentRoutes.get('/get/:postId',getComments)
module.exports=commentRoutes