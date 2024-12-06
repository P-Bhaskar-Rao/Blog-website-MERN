const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/Userroutes.js");
const { authRouter } = require("./routes/Authroutes.js");
dotenv.config();
const app = express();
app.use(express.json())
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
