import express from "express";
import { authenticateToken } from "../middleware/authmiddelware.js";
import { getNotes, saveNote } from "../controllers/noteController.js";
import User from "../models/user.js";
import Note from "../models/note.js";
const router = express.Router();

router.use(authenticateToken);

router.get("/getNote/:id", (req, res) => {});

router.post("/createNote", saveNote);

router.get("/notes", getNotes);
export default router;
