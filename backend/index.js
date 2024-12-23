const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path=require('path')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const multer=require('multer')
const { userRoutes } = require("./routes/Userroutes.js");
const { authRoutes } = require("./routes/Authroutes.js");
const { uploadRoutes } = require("./routes/UploadRoutes.js");
const { PostRoutes } = require("./routes/PostRoutes.js");
const commentRoutes = require("./routes/CommentRoutes.js");
dotenv.config();
const app = express();

//mongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));


const corsOptions={
  origin: ["http://localhost:5173"],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/uploads/profiles',express.static('uploads/profiles'))
app.use('/uploads/posts',express.static('uploads/posts'))

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/post',PostRoutes)
app.use('/api/comment',commentRoutes)
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500
  const message=err.message||'Internal server error'
  const success=err.success||false
  return res.status(statusCode).json({
    statusCode,
    success,
    message
  })
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
