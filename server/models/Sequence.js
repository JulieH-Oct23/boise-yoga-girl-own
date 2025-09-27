// import Sequence from "../models/Sequence.js";

// // Create a new sequence
// export const createSequence = async (req, res) => {
//   try {
//     const { name, style, difficulty, poses } = req.body;

//     const posesWithDuration = poses.map(p => ({
//       name: p.name,
//       image: p.image || null,
//       duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [15],
//     }));

//     const sequence = new Sequence({
//       name,
//       style,
//       difficulty,
//       poses: posesWithDuration,
//     });

//     const savedSequence = await sequence.save();
//     res.status(201).json(savedSequence);
//   } catch (err) {
//     console.error("Failed to create sequence:", err);
//     res.status(500).json({ message: "Failed to create sequence" });
//   }
// };

// // Get a sequence by ID
// export const getSequenceById = async (req, res) => {
//   try {
//     const sequence = await Sequence.findById(req.params.id);
//     if (!sequence) return res.status(404).json({ message: "Sequence not found" });
//     res.json(sequence);
//   } catch (err) {
//     console.error("Failed to fetch sequence:", err);
//     res.status(500).json({ message: "Failed to fetch sequence" });
//   }
// };

// // Update sequence (for timers or edits)
// export const updateSequence = async (req, res) => {
//   try {
//     const { name, style, difficulty, poses } = req.body;

//     const posesWithDuration = poses.map(p => ({
//       name: p.name,
//       image: p.image || null,
//       duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [15],
//     }));

//     const updatedSequence = await Sequence.findByIdAndUpdate(
//       req.params.id,
//       { name, style, difficulty, poses: posesWithDuration },
//       { new: true }
//     );

//     if (!updatedSequence) return res.status(404).json({ message: "Sequence not found" });
//     res.json(updatedSequence);
//   } catch (err) {
//     console.error("Failed to update sequence:", err);
//     res.status(500).json({ message: "Failed to update sequence" });
//   }
// };

// // Get all sequences
// export const getAllSequences = async (req, res) => {
//   try {
//     const sequences = await Sequence.find();
//     res.json(sequences);
//   } catch (err) {
//     console.error("Failed to fetch sequences:", err);
//     res.status(500).json({ message: "Failed to fetch sequences" });
//   }
// };
import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    style: { type: String, enum: ["Yin", "Power", "Restorative"], required: true },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    poses: [
      {
        _id: false,
        name: { type: String, required: true },
        image: { type: String },
        duration: { type: [Number], default: [15] }, // ensure default array
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Sequence", sequenceSchema);