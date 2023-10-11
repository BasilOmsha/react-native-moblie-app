// flight.js
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  departureCity: String,
  arrivalCity: String,
  departureDate: Date,
  // Other flight-related fields
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
