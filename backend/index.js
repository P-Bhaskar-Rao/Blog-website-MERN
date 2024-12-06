const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
