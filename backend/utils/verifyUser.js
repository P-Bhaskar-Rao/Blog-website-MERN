import jwt from "jsonwebtoken"
import  errorHandler  from "./error.js";
const verifyUser = (req, res, next) => {
  const token=req.cookies.token
  if (!token) {
    return next(errorHandler(401, "No Token - Unauthorized", false));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      return next(errorHandler(401, "Token corrupted - Unauthorized", false));
    }
    req.user = userData;
    next();
  });
};

export default verifyUser

