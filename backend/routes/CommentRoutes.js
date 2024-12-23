const express=require('express')
const { createComment } = require('../controllers/CommentControllers')
const { verifyUser } = require('../utils/verifyUser')
const commentRoutes=express.Router()
commentRoutes.post('/create',verifyUser,createComment)

module.exports=commentRoutes