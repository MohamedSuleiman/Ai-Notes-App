import Note from "../models/note.js";
import User from "../models/user.js";
export async function getNotes(req, res) {
  try {
    const id = req.user.sub;
    const notes = await Note.find({ user: id });
    if (notes.length === 0) {
      {
        return res.status(200).json({ message: "You have 0 notes saved!" });
      }
    }
    return res.status(200).json({ notes: notes });
  } catch (err) {
    console.log(err);
  }
}

export async function saveNote(req, res) {
  try {
    const id = req.user.sub;
    const user = await User.findOne({ _id: id });
    const userContent = req.body.content;
    if (!userContent) {
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
