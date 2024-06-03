import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) return res.status(401).json("Not authenticated");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json("Not authenticated");
  }
};
