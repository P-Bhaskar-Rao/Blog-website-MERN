const jwt=require('jsonwebtoken')
const generateJwtToken=(validUser)=>{
    const token = jwt.sign(
        {
          id: validUser._id,
          username: validUser.username,
          email: validUser.email,
        },
        process.env.JWT_SECRET,
        
      );
     return token;
 }

 module.exports={
    generateJwtToken,
 }