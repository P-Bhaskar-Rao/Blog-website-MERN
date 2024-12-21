const express=require('express')
const { verifyUser } = require('../utils/verifyUser')
const { createPost, getPosts } = require('../controllers/PostControllers')
const PostRoutes=express.Router()
PostRoutes.post('/create',verifyUser,createPost)
PostRoutes.get('/get',verifyUser,getPosts)
module.exports={
    PostRoutes,
}