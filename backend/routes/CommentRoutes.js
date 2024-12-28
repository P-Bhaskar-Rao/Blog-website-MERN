import express from "express"
import { createComment, getComments, likeComment, editComment, deleteComment, getAllComments } from '../controllers/CommentControllers.js'
import  verifyUser from '../utils/verifyUser.js'
const commentRoutes=express.Router()
commentRoutes.post('/create',verifyUser,createComment)
commentRoutes.get('/get/:postId',getComments)
commentRoutes.get('/get-comments',verifyUser,getAllComments)
commentRoutes.put('/like-comment/:commentId',verifyUser,likeComment)
commentRoutes.put('/edit-comment/:commentId',verifyUser,editComment)
commentRoutes.delete('/delete-comment/:commentId',verifyUser,deleteComment)
export default commentRoutes
