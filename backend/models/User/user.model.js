const UserSchema = require("./User.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BookSchema = require("../Book/Book.js");

const getUserInfo = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.findOne({
      email: email,
    });

    bcrypt.compare(password, user.hash_password, (err, result) => {
      if (err) throw err;

      if (result) {
        const newUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        };

        res.status(201).json(newUser);
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.hash_password = hashedPassword;
  const newUser = new UserSchema(user);
  try {
    await newUser.save();
    const resultUser = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    };
    res.status(201).json(resultUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserSchema.findById(req.user._id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.hash_password = hashedPassword;
      }

      await user.save();
      const newUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      };
      res.status(200).json(newUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", { expiresIn: "7d" });
};

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
};
