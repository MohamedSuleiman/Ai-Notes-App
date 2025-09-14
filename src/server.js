import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PATH = process.env.PORT || 5000;

app.listen(PATH, () => {
  console.log(`Server running on port ${PATH}`);
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<style> body{background: blue;} </style><body><div>Welcome to the home page</div></body>`
    );
});
