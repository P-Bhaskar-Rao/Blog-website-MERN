const express=require('express')
const { verifyUser } = require('../utils/verifyUser')
const { createPost, getPosts,deletePost } = require('../controllers/PostControllers')
const PostRoutes=express.Router()
PostRoutes.post('/create',verifyUser,createPost)
PostRoutes.get('/get',verifyUser,getPosts)
PostRoutes.delete('/delete/:postId/:userId',verifyUser,deletePost)
module.exports={
    PostRoutes,
}