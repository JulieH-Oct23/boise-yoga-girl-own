import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = "your_mongodb_connection_string_here"; // put your actual Mongo URI here
const DB_NAME = "your_db_name"; // e.g. "yoga"
const COLLECTION_NAME = "poses";

async function fixAnatomy() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch all poses
    const poses = await collection.find({}).toArray();
    console.log(`Fetched ${poses.length} poses`);

    for (const pose of poses) {
      let changed = false;
      let anatomy = pose.anatomy;

      // Fix if anatomy is null, empty string, or not array
      if (!Array.isArray(anatomy)) {
        if (typeof anatomy === "string" && anatomy.trim() !== "") {
          anatomy = [anatomy.trim()];
          changed = true;
        } else {
          anatomy = [];
          changed = true;
        }
      }

      // Filter anatomy array to include only non-empty strings
      const filteredAnatomy = anatomy.filter(
        (part) => typeof part === "string" && part.trim() !== ""
      );

      if (
        filteredAnatomy.length !== anatomy.length ||
        changed
      ) {
        // Update pose anatomy field with cleaned array
        await collection.updateOne(
          { _id: pose._id },
          { $set: { anatomy: filteredAnatomy } }
        );
        console.log(`Updated anatomy for pose: ${pose.name} (${pose._id})`);
      }
    }

    console.log("Anatomy fix complete!");
  } catch (err) {
    console.error("Error fixing anatomy:", err);
  } finally {
    await client.close();
  }
}

fixAnatomy();