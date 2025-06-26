import express from "express";
import Pose from "../models/PoseModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const poses = await Pose.find();
    res.json(poses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
