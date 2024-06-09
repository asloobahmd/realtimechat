import { app, server } from "./socket/socket.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import convoRoutes from "./routes/conversation.js";
import messageRoutes from "./routes/message.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const PORT = process.env.PORT || 5000;

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
