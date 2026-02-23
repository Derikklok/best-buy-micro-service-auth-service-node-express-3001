import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongoDB } from "./config/mongodb.js";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "auth-service" });
});

app.use("/api/auth", authRoutes);

const start = async () => {
  await connectMongoDB();

  app.listen(process.env.PORT, () => {
    console.log(`Auth Service running on port ${process.env.PORT}`);
  });
};

start();
