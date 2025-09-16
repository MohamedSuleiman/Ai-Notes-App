import app from "./app.js";
import connectDB from "./db.js";
import { PORT } from "./config.js";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<style> body{background: blue;} </style><body><div>Welcome to the home page</div></body>`
    );
});

app.use("/api", authRouter);
app.use("/api", notesRouter);
