import { MongoClient } from "mongodb";
import { ATLAS_URI } from "./config.js";
const connectionString = ATLAS_URI;

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
