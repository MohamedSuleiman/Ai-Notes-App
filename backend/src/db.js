import { ATLAS_URI } from "./config.js";
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(ATLAS_URI);
    console.log("Connected to the database");
    return connection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
