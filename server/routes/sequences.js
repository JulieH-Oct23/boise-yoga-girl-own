
// import express from "express";
// import Sequence from "../models/Sequences.js";

// const router = express.Router();

// // GET all sequences
// router.get("/", async (req, res) => {
//   try {
//     const sequences = await Sequence.find();
//     res.json(sequences);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET a sequence by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const sequence = await Sequence.findById(req.params.id);
//     if (!sequence) {
//       return res.status(404).json({ message: "Sequence not found" });
//     }
//     res.json(sequence);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // POST a new sequence
// router.post("/", async (req, res) => {
//   const { name, difficulty, style, poses } = req.body;

//   if (!name || !difficulty || !style || !poses) {
//     return res.status(400).json({ message: "Please provide all required fields" });
//   }

//   const newSequence = new Sequence({
//     name,
//     difficulty,
//     style,
//     poses,
//   });

//   try {
//     const savedSequence = await newSequence.save();
//     res.status(201).json(savedSequence);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // PUT update a sequence by ID  <=== THIS WAS MISSING
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedSequence = await Sequence.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!updatedSequence) {
//       return res.status(404).json({ message: "Sequence not found" });
//     }
//     res.json(updatedSequence);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// export default router;
// import express from "express";
// import Sequence from "../models/Sequences.js";

// const router = express.Router();

// // Helper to ensure poses always have duration array
// const ensureDuration = (poses) =>
//   poses.map((p) => ({
//     name: p.name,
//     image: p.image || null,
//     duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [15],
//   }));

// // GET all sequences
// router.get("/", async (req, res) => {
//   try {
//     const sequences = await Sequence.find();
//     res.json(sequences);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET a sequence by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const sequence = await Sequence.findById(req.params.id);
//     if (!sequence) {
//       return res.status(404).json({ message: "Sequence not found" });
//     }
//     res.json(sequence);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // POST a new sequence
// router.post("/", async (req, res) => {
//   const { name, difficulty, style, poses } = req.body;

//   if (!name || !difficulty || !style || !poses) {
//     return res.status(400).json({ message: "Please provide all required fields" });
//   }
  

//   const newSequence = new Sequence({
//     name,
//     difficulty,
//     style,
//     poses: ensureDuration(poses), // <- enforce duration array
//   });

//   try {
//     const savedSequence = await newSequence.save();
//     res.status(201).json(savedSequence);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // PUT update a sequence by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, difficulty, style, poses } = req.body;

//     const updatedSequence = await Sequence.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         difficulty,
//         style,
//         poses: ensureDuration(poses), // <- enforce duration array
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedSequence) {
//       return res.status(404).json({ message: "Sequence not found" });
//     }
//     res.json(updatedSequence);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// export default router;
import express from "express";
import {
  createSequence,
  getAllSequences,
  getSequenceById,
  updateSequence,
} from "../controllers/Sequences.js";

const router = express.Router();

router.get("/", getAllSequences);
router.get("/:id", getSequenceById);
router.post("/", createSequence);
router.put("/:id", updateSequence);

export default router;