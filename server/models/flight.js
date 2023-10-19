// flight.js
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  from: {
    country: String,
    airport: String,
    capitalCity: String,
  },
  to: {
    country: String,
    airport: String,
    capitalCity: String,
  },
  departureTime: String,
  arrivalTime: String,
  isDirectFlight: Boolean,
  stopoverCountry: String,
  airline: String,
  duration: String,
  price: Number,
});

// Other flight-related fields

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
