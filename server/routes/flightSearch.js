const express = require("express");
const router = express.Router();
const { generateRandomFlight } = require("../utils/generateRandomFlight");
const { europeanCountriesWithAirports } = require("../data");

router.get("/", (req, res) => {
  const {
    from,
    to,
    date,
    round,
    returnDate,
    selectedAirline,
    selectedMaxDuration,
    selectedStops,
  } = req.query;

  // Find the country objects for both 'from' and 'to' based on the country names
  const countryFrom = europeanCountriesWithAirports.find(
    (entry) => entry.capitalCity === from
  );
  const countryTo = europeanCountriesWithAirports.find(
    (entry) => entry.capitalCity === to
  );

  if (!countryFrom || !countryTo) {
    return res.status(400).json({ error: "Invalid country name" });
  }

  // Now, you can access the capital cities as needed
  const capitalCityFrom = countryFrom.country;
  const capitalCityTo = countryTo.country;

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

      const filteredFlights = generateRandomFlight(
        countryFrom.airport,
        countryTo.airport,
        outboundStartDate,
        from,
        to,
        selectedAirline,
        selectedMaxDuration,
        selectedStops,
        capitalCityFrom,
        capitalCityTo
      );

      return filteredFlights; // Return filtered flights
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
        to,
        selectedAirline,
        selectedMaxDuration,
        selectedStops,
        capitalCityFrom,
        capitalCityTo
      );

      const returnFlight = generateRandomFlight(
        countryTo.airport,
        countryFrom.airport,
        returnFlightStartDate,
        to,
        from,
        selectedAirline,
        selectedMaxDuration,
        selectedStops,
        capitalCityTo,
        capitalCityFrom
      );

      return { outbound: outboundFlight[index], return: returnFlight[index] };
    });
  }

  res.json({
    outboundFlights,
    returnFlights,
    capitalCityFrom, // Include capital cities in the response if needed
    capitalCityTo,
  });
});

module.exports = router;
