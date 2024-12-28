import bcryptjs from "bcryptjs"
import {User} from "../models/Usermodel.js";
import  errorHandler  from "../utils/error.js";
import  generateJwtToken  from "../utils/generateJwtToken.js";
export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "all fields are required", false));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = generateJwtToken(validUser);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("token", token, {
        secure: true,
        sameSite: "none",
      })
    return res.status(200).json(rest)
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoURL } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      const token = generateJwtToken(validUser);
      const { password: pass, ...rest } = validUser._doc;
      return res
        .status(200)
        .cookie("token", token, {
          secure: true,
        sameSite: "none"
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      const token = generateJwtToken(newUser);
      const { password: pass, ...rest } = newUser._doc;
      return res
        .status(200)
        .cookie("token", token, {
          secure: true,
          sameSite: "none",
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

