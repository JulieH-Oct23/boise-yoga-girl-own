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