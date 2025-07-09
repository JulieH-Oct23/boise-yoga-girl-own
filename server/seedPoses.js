// import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";
// import mongoose from "mongoose";
// import process from "process";
// import Pose from "./models/PoseModel.js";

// dotenv.config();

// const posesFilePath = path.join(process.cwd(), "yoga-json", "poses.json");

// const poses = JSON.parse(fs.readFileSync(posesFilePath, "utf-8"));

// async function seed() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");

//     await Pose.deleteMany({});
//     console.log("Cleared existing poses");

//     await Pose.insertMany(poses);
//     console.log(`Inserted ${poses.length} sample poses`);

//     await mongoose.connection.close();
//     console.log("Connection closed");
//     process.exit(0);  // exit cleanly
//   } catch (err) {
//     console.error("Seeding error:", err);
//     process.exit(1);
//   }
// }

// seed();


import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import process from "process";
import Pose from "./models/PoseModel.js";

dotenv.config();

const poses = JSON.parse(fs.readFileSync("./yoga-json/poses.json", "utf-8")); // ✅ FIXED relative path

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Pose.deleteMany({});
    console.log("Cleared existing poses");

    await Pose.insertMany(poses);
    console.log(`Inserted ${poses.length} sample poses`);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();