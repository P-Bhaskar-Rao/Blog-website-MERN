import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"

import { userRoutes } from "./routes/Userroutes.js";
import   authRoutes  from "./routes/Authroutes.js";
import   uploadRoutes  from "./routes/UploadRoutes.js";
import  PostRoutes  from "./routes/PostRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js";
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
