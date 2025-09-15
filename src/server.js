import app from "./app.js";
import connectDB from "./db.js";
import { port } from "./config.js";

const PORT = port;

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

app.get("/register", (req, res) => {
  res.send("<h1>HEI PÅ DEG</h1>");
});
