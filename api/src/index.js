import { app, server } from "./socket/socket.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import { authMiddleware } from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/auth.js";
import convoRoutes from "./routes/conversation.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";

const PORT = process.env.PORT || 4000;

dotenv.config();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/conversation", authMiddleware, convoRoutes);
app.use("/message", authMiddleware, messageRoutes);

//test route
app.get("/", (req, res) => {
  res.json("Hello from api - testing");
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
