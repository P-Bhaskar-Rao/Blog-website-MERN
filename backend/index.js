const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require('cors')
const { userRouter } = require("./routes/Userroutes.js");
const { authRouter } = require("./routes/Authroutes.js");
dotenv.config();
const app = express();
const corsOptions={
  secure:false
}
app.use(cors(corsOptions))
app.use(express.json())
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));



app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
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
