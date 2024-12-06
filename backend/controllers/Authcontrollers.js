const bcryptjs=require('bcryptjs')
const { User } = require("../models/Usermodel.js");
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword=bcryptjs.hashSync(password,10)
  const newUser = new User({ username, email, password:hashedPassword });
  try {
    await newUser.save();
    return res.status(201).json({ message: "signup successful" });
  } catch (error) {
    return res.status(500).json({message:error})
  }

};

module.exports = {
  signup,
};
