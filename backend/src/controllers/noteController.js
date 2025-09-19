import Note from "../models/user.js";
export async function getNotes(req, res) {
  const id = req.user.sub;
  const notes = await Note.find({ user: id });
  res.status(200).json({ notes: notes });
}

export default async function saveNote(req, res) {
  try {
    const id = req.user.sub;
    const user = await User.findOne({ _id: id });
    const userContent = req.body.content;
    if (!content) {
      return res
        .status(400)
        .json({ errorMessage: "Note content cannot be empty." });
    }
    const newNote = new Note({ content: userContent, user: user._id });
    await newNote.save();
    res.status(200).json("Note saved!");
  } catch (err) {
    res.status(500).json({ errorMessage: "Could not save note" });
    console.error(err);
  }
}
