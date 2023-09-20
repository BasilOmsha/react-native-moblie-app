// routes/flightSearch.js
const express = require("express");
const router = express.Router();
const { generateRandomFlight } = require("../utils/generateRandomFlight");
const { europeanCountriesWithAirports } = require("../data");

router.get("/", (req, res) => {
  const { from, to, date } = req.query;

  const countryFrom = europeanCountriesWithAirports.find(
    (entry) => entry.country === from
  );
  const countryTo = europeanCountriesWithAirports.find(
    (entry) => entry.country === to
  );

  if (!countryFrom || !countryTo) {
    return res.status(400).json({ error: "Invalid country name" });
  }

  const startDate = new Date(date);
  if (isNaN(startDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  const numberOfFlights = 15;

  const flights = Array.from({ length: numberOfFlights }, (_, index) => {
    // Calculate the date for each flight based on the index
    const flightStartDate = new Date(startDate);
    flightStartDate.setDate(flightStartDate.getDate() + index);

    return generateRandomFlight(
      countryFrom.airport,
      countryTo.airport,
      flightStartDate,
      from,
      to
    );
  });

  res.json({ flights });
});

module.exports = router;
