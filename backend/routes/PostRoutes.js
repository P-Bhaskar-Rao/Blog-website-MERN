import express from "express"
import verifyUser from "../utils/verifyUser.js"
import  { createPost, getPosts,deletePost,updatePost } from '../controllers/PostControllers.js'
const PostRoutes=express.Router()
PostRoutes.post('/create',verifyUser,createPost)
PostRoutes.get('/get',verifyUser,getPosts)
PostRoutes.delete('/delete/:postId/:userId',verifyUser,deletePost)
PostRoutes.put('/update/:postId/:userId',verifyUser,updatePost)
export default PostRoutes