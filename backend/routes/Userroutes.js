const express=require("express");
const { verifyUser } = require("../utils/verifyUser.js");
const { updateUser } = require("../controllers/Usercontrollers.js");
const userRoutes=express.Router();
userRoutes.get('/',(req,res)=>{
    res.send("Hello")
})
userRoutes.put('/update/:userId',verifyUser,updateUser)
module.exports={
    userRoutes,
}