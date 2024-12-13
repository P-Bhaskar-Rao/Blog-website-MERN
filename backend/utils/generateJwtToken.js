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

 const verifyToken=(req,res,next)=>{
  const token=req.cookies
  console.log("verify=",token)
  // if(token){
  //   jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
  //     if(err){
  //       return res.status(403).json({message:"token is not valid"})
  //     }
  //     console.log("payload=",payload)
  //     req.userId=payload.id
  //   })
  // }else{
  //   return res.status(401).json({message:"unauthenticated"})
  // }
  next()
 }
 module.exports={
    generateJwtToken,
    verifyToken,
 }