require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

app.use(express.json());

// Start the server
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
  // Corrected order of (req, res)
  res.json("hello world");
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
