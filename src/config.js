import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 5000;
export const ATLAS_URI = process.env.ATLAS_URI;
