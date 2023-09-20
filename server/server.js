// server.js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Import the routes for flight search
const flightSearchRoutes = require("./routes/flightSearch");

// Start the server
const port = process.env.PORT || 3001;

app.use("/search", flightSearchRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
