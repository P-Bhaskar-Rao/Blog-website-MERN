const express=require("express");
const { verifyUser } = require("../utils/verifyUser.js");
const { updateUser,deleteUser,signout,getUsers } = require("../controllers/Usercontrollers.js");
const userRoutes=express.Router();
userRoutes.get('/',(req,res)=>{
    res.send("Hello")
})
userRoutes.put('/update/:userId',verifyUser,updateUser)
userRoutes.delete('/delete/:userId',verifyUser,deleteUser)
userRoutes.post('/signout',signout)
userRoutes.get('/get-users',verifyUser,getUsers)

module.exports={
    userRoutes,
}