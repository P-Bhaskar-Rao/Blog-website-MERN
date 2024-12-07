const bcryptjs = require("bcryptjs");
const jwt=require('jsonwebtoken')
const { User } = require("../models/Usermodel.js");
const { errorHandler } = require("../utils/error.js");
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "all fields are required", false));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    next(errorHandler(201, "signup successful", true));
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "all fields are required", false));
  }


  try {
    const validUser = await User.findOne({email});
   if(!validUser){
    return next(errorHandler(404,'User not found'))
   }
   const validPassword=bcryptjs.compareSync(password,validUser.password)
   if(!validPassword){
    return next(errorHandler(400,'Invalid Password'))
   }

   const token=jwt.sign({id:validUser._id,username:validUser.username,email:validUser.email},process.env.JWT_SECRET)
   const {password:pass,...rest}=validUser._doc
   return res.status(200).cookie('token',token,{
    httpOnly:true
   }).json(rest)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
