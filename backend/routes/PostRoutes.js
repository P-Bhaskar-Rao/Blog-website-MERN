const express=require('express')
const { verifyUser } = require('../utils/verifyUser')
const { createPost } = require('../controllers/PostControllers')
const PostRoutes=express.Router()
PostRoutes.post('/create',verifyUser,createPost)
module.exports={
    PostRoutes,
}