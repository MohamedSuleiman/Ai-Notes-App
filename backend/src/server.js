import express from "express";
import connectDB from "./db.js";
import { PORT } from "./config.js";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
import cors from "cors";

const app = express();

// To allow the react server to send request to our backend, but access is only restricted in broswer
// Postman, curl and so on can still send request to our backend, so further protection is needed i.e.
// using jwt and refresh tokens
const corsDef = {
  origin: "http://localhost:5173",
};

app.use(cors(corsDef));
connectDB();
app.use(express.json());
app.use("/", authRouter);
app.use("/api", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
