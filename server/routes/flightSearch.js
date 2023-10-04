const express = require("express");
const router = express.Router();
const { generateRandomFlight } = require("../utils/generateRandomFlight");
const { europeanCountriesWithAirports } = require("../data");

router.get("/", (req, res) => {
  const { from, to, date, round, returnDate } = req.query;

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

  const numberOfFlights = 5;

  const outboundFlights = Array.from(
    { length: numberOfFlights },
    (_, index) => {
      // Calculate the date for each outbound flight based on the index
      const outboundStartDate = new Date(startDate);
      outboundStartDate.setDate(outboundStartDate.getDate() + index);

      return generateRandomFlight(
        countryFrom.airport,
        countryTo.airport,
        outboundStartDate,
        from,
        to
      );
    }
  );

  // If round trip is selected, generate return flights as well
  let returnFlights = [];
  if (round && returnDate && startDate) {
    const returnStartDate = new Date(returnDate);

    returnFlights = Array.from({ length: numberOfFlights }, (_, index) => {
      // Calculate the date for each return flight based on the index and return date
      const returnFlightStartDate = new Date(returnStartDate);
      returnFlightStartDate.setDate(returnFlightStartDate.getDate() + index);
      const outboundStartDate = new Date(startDate);
      outboundStartDate.setDate(outboundStartDate.getDate() + index);
      const outboundFlight = generateRandomFlight(
        countryFrom.airport,
        countryTo.airport,
        outboundStartDate,
        from,
        to
      );

      const returnFlight = generateRandomFlight(
        countryTo.airport,
        countryFrom.airport,
        returnFlightStartDate,
        to,
        from
      );

      return { outbound: outboundFlight[index], return: returnFlight[index] };
    });
  }

  res.json({ outboundFlights, returnFlights }); // Include both outbound and return flights in the response
});

module.exports = router;
