import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/helpers.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json("All fields are required");

    const existUser = await User.findOne({ username });
    if (existUser)
      return res.status(409).json("User with same username already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!createdUser)
      return res
        .status(500)
        .json("Something went wrong, couldn't create user.");

    const userObj = {
      id: createdUser.id,
      username: createdUser.username,
    };

    return res.status(201).json(userObj);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong, couldn't create user.");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json("All fields are required");

    const existUser = await User.findOne({ username });
    if (!existUser) return res.status(404).json("User does not exists");

    const isPasswordMatch = bcrypt.compareSync(password, existUser.password);
    if (!isPasswordMatch) return res.status(422).json("Incorrect password");

    const token = generateToken(existUser.id);

    const userObj = {
      id: existUser.id,
      username: existUser.username,
    };

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(userObj);
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong, try login later.");
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out");
  } catch (error) {
    console.log(error);
  }
};
