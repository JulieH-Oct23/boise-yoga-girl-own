// ./models/PoseModel.js
import mongoose from "mongoose";

const PoseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sanskritName: String,
  image: String,
  category: [String], // array of categories
  level: String,
  cue: String,
  anatomy: String, // comma-separated string (e.g., "spine, hamstrings")
  indications: [String],
  counterIndications: [String],
  timing: [String],
  description: String, // optional if you’re using a separate description
});

const Pose = mongoose.model("Pose", PoseSchema);
export default Pose;
