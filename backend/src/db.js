import { ATLAS_URI } from "./config.js";
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(ATLAS_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
}
