// server/index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pose from "./models/PoseModel.js";
import process from "./process" ;// Make sure this exists and is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error.message);
});

// Routes
app.get("/", (req, res) => {
  res.send("Yoga Pose API is running...");
});

app.get("/api/poses", async (req, res) => {
  try {
    const poses = await Pose.find();
    res.json(poses);
  } catch (error) {
    console.error("Error fetching poses:", error.message);
    res.status(500).json({ message: "Failed to fetch poses" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});