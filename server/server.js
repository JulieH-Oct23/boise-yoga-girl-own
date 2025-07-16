import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import process from "process";
import posesRoutes from "./routes/poses.js";


import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env from ./server/.env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Enable CORS for all origins (adjust origin in options if needed)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Register your API routes
app.use("/api/poses", posesRoutes);

// Catch-all 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Use PORT from env or fallback to 4000 to avoid port conflicts
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Boise Yoga Girl backend is running 🧘‍♀️");
});