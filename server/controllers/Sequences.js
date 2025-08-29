import Sequence from "../models/Sequence.js";

// Helper: Ensure poses always have duration array
const ensureDuration = (poses) =>
  poses.map((p) => ({
    name: p.name,
    image: p.image || null,
    duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [15],
  }));

// Create a new sequence
export const createSequence = async (req, res) => {
  try {
    const { name, style, difficulty, poses } = req.body;

    if (!name || !style || !difficulty || !poses) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const sequence = new Sequence({
      name,
      style,
      difficulty,
      poses: ensureDuration(poses),
    });

    const savedSequence = await sequence.save();
    res.status(201).json(savedSequence);
  } catch (err) {
    console.error("Failed to create sequence:", err);
    res.status(500).json({ message: "Failed to create sequence" });
  }
};

// Get all sequences
export const getAllSequences = async (req, res) => {
  try {
    const sequences = await Sequence.find();
    res.json(sequences);
  } catch (err) {
    console.error("Failed to fetch sequences:", err);
    res.status(500).json({ message: "Failed to fetch sequences" });
  }
};

// Get a sequence by ID
export const getSequenceById = async (req, res) => {
  try {
    const sequence = await Sequence.findById(req.params.id);
    if (!sequence) return res.status(404).json({ message: "Sequence not found" });
    res.json(sequence);
  } catch (err) {
    console.error("Failed to fetch sequence:", err);
    res.status(500).json({ message: "Failed to fetch sequence" });
  }
};

// Update a sequence
export const updateSequence = async (req, res) => {
  try {
    const { name, style, difficulty, poses } = req.body;

    const updatedSequence = await Sequence.findByIdAndUpdate(
      req.params.id,
      {
        name,
        style,
        difficulty,
        poses: ensureDuration(poses),
      },
      { new: true, runValidators: true }
    );

    if (!updatedSequence) return res.status(404).json({ message: "Sequence not found" });
    res.json(updatedSequence);
  } catch (err) {
    console.error("Failed to update sequence:", err);
    res.status(500).json({ message: "Failed to update sequence" });
  }
};