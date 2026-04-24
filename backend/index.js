import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: [
    "http://localhost:3000",
    "https://real-time-chat-app-frontend-7wge.onrender.com"
  ],
  credentials: true
};

app.use(cors(corsOption));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});