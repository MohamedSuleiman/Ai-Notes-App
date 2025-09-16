import express from "express";

const router = express.Router();

router.get("/getnote/:id", (req, res) => {
  res
    .status(200)
    .send(JSON.stringify({ text: "ndsjkfnjkdsf klndjksfnjksdfn " }));
});

router.post("/createNote", (req, res) => {});

router.get("/showAllNotes", (req, res) => {});
export default router;
