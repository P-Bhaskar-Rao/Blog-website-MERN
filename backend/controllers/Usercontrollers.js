const fs = require("fs");
const { User } = require("../models/Usermodel.js");
const { errorHandler } = require("../utils/error.js");
const bcryptjs = require("bcryptjs");

const updateUser = async (req, res, next) => {
  console.log(req.params.userId, req.user.id);
  if (req.params.userId !== req.user.id) {
    return next(
      errorHandler(401, "You are not allowed to update this user", false)
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be atleast 6 chearcters", false)
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(
          400,
          "Username must be between 7 and 20 characters ",
          false
        )
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, `Username cannot contain  spaces`));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase", false));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          "Username can contain only letters and numbers",
          false
        )
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          id: req.body.id,
          username: req.body.username,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  updateUser,
};
