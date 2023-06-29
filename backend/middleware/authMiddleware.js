const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/User/User.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // req.headers.authorization header is formatted like this: "Bearer token"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, "abc123");

      const user = await UserSchema.findById(decoded.id);
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      } else {
        console.log("User found: ", user);

        req.user = user;
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token ");
  }
});

module.exports = {
  protect,
};
