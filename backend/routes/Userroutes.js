import express from "express"
import   verifyUser  from "../utils/verifyUser.js";
import { updateUser,deleteUser,signout,getUsers,getUser } from "../controllers/Usercontrollers.js";
export const userRoutes=express.Router();
userRoutes.get('/',(req,res)=>{
    res.send("Hello")
})
userRoutes.put('/update/:userId',verifyUser,updateUser)
userRoutes.delete('/delete/:userId',verifyUser,deleteUser)
userRoutes.post('/signout',signout)
userRoutes.get('/get-users',verifyUser,getUsers)
userRoutes.get('/:userId',getUser)

