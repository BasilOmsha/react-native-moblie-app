// server.js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

dotenv.config();
const flightSearchRoutes = require("./routes/flightSearch");

// Import the routes for flight search
const postToDb = require("./routes/travelerInfo");
//use db connection
const dbConnection = require("./db/db");
// Start the server
const port = process.env.PORT;
app.use("/search", flightSearchRoutes);
app.use("/travelerinfo", postToDb);
app.use("/travelerinfo", postToDb);


dbConnection();
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
