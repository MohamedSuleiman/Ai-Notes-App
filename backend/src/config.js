import dotenv from "dotenv";
import express from "express";
dotenv.config();
export const PORT = process.env.PORT || 5000;
export const ATLAS_URI = process.env.ATLAS_URI;
