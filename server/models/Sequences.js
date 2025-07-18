import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  style: { type: String, enum: ["Yin", "Power", "Restorative"], required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  poses: [
    {
      _id: false,
      name: String,
      image: String,
    }
  ],
}, { timestamps: true });

export default mongoose.model("Sequence", sequenceSchema);