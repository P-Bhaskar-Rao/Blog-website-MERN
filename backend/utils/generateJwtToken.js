import jwt from "jsonwebtoken"
const generateJwtToken=(validUser)=>{
    const token = jwt.sign(
        {
          id: validUser._id,
          username: validUser.username,
          email: validUser.email,
          isAdmin:validUser.isAdmin,
        },
        process.env.JWT_SECRET,
        
      );
     return token;
 }

export default generateJwtToken