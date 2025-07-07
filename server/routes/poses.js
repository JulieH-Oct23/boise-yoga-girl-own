import express from "express";
import Pose from "../models/PoseModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const poses = await Pose.find();
    res.json(poses); // ✅ make sure poses is an array
  } catch (err) {
    console.error("❌ Error fetching poses:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get one pose by ID
router.get("/:id", async (req, res) => {
  try {
    const pose = await Pose.findById(req.params.id);
    if (!pose) {
      return res.status(404).json({ message: "Pose not found" });
    }
    res.json(pose);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new pose
router.post("/", async (req, res) => {
  const { name, image, category, description } = req.body;
  const newPose = new Pose({ name, image, category, description });

  try {
    const savedPose = await newPose.save();
    res.status(201).json(savedPose);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
