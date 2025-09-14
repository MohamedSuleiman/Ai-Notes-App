import { MongoClient } from "mongodb";
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

export default async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
