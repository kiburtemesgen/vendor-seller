import expressAsync from "express-async-handler";
import { Roles } from "../constants/roles.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const createUser = expressAsync(async (req, res) => {
  const { username, password } = req.body;

  const isUserExist = await User.findOne({ username });

  if (isUserExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  const user = await User.create({
    username,
    password,
    deposit: 0,
    role: Roles.BUYER,
  });

  if (!user) {
    res.status(500);
    throw new Error(" can not create a employee");
  }

  res.status(201).json({
    id: user._id,
    username: user.username,
    deposit: user.deposit,
    role: user.role,
    token: generateToken(user._id),
  });
});

const getUser = expressAsync(async (req, res) => {
  const user = req.user
  if (!user) {
    res.status(401);
    throw new Error("not authorized");
  }
  res.status(200).send(user);
});

const updateUser = expressAsync(async (req, res) => {
  const { username, password } = req.body;
  const id = req.params.id

  const user = req.user;
  if (!user || user._id.toString() !== id) {
    res.status(401);
    throw new Error("not authorized");
  }
  user.username = username || user.username;
  user.password = password || user.password;

  const updatedUser = await user.save();
  res.status(201).json({
    token: generateToken(updatedUser._id),
  });
});

const deleteUser = expressAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.id
  if (!user || user._id.toString() !== id) {
    res.status(401);
    throw new Error("not authorized");
  }
  await user.remove();
  res.json({
    message: "User removed successfully",
  });
});

export { createUser, getUser, updateUser, deleteUser };


