import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (userId) => {
  return usersListObj[userId];
};

const usersListObj = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") usersListObj[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(usersListObj));

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    io.to(receiverSocketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    delete usersListObj[userId];
    io.emit("getOnlineUser", Object.keys(usersListObj));
  });
});

export { app, io, server };
