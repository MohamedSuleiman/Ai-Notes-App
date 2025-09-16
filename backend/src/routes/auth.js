import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(200).send();
});

router.get("/", (req, res) => {});

router.put("/createUser", (req, res) => {});

export default router;
