import Note from "../models/user.js";
export async function getNotes(req, res) {
  const id = req.user.sub;
  const notes = await Note.find({ user: id });
  res.status(200).json({ notes: notes });
}
