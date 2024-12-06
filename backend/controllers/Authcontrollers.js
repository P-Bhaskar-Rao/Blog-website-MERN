const bcryptjs=require('bcryptjs')
const { User } = require("../models/Usermodel.js");
const { errorHandler } = require('../utils/error.js');
const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400,"all fields are required",false))
  }
  const hashedPassword=bcryptjs.hashSync(password,10)
  
  try {
    const newUser = new User({ username, email, password:hashedPassword });
    await newUser.save();
    next(errorHandler(201,"signup successful",true))
  } catch (error) {
   next(error)
  }

};

module.exports = {
  signup,
};
