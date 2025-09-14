import express from "express";

const app = express();

const PATH = 3400;

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
