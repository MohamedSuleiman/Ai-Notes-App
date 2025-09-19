import express from "express";
import { login, signup, refreshToken } from "../controllers/authController.js";
import cookieReader from "cookie-parser";

const router = express.Router();
router.use(cookieReader());

router.post("/login", login);
router.post("/signup", signup);
router.post("/refresh", refreshToken);

export default router;
