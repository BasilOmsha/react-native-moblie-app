// utils/generateRandomFlight.js
const { europeanCountriesWithAirports, airlines } = require("../data");

function generateRandomFlight(from, to, startDate, fromCountry, toCountry) {
  const isDirectFlight = Math.random() < 0.5;
  const durationHours = isDirectFlight ? 4 : Math.floor(Math.random() * 10) + 1;
  const durationMinutes = isDirectFlight ? 0 : Math.floor(Math.random() * 60);

  const departureTime = new Date(
    startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  );
  const arrivalTime = new Date(
    departureTime.getTime() + (durationHours * 60 + durationMinutes) * 60 * 1000
  );

  const stopoverCountry = isDirectFlight
    ? null
    : europeanCountriesWithAirports[
        Math.floor(Math.random() * europeanCountriesWithAirports.length)
      ].country;
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  const durationString = `${durationHours}h ${durationMinutes}m`;

  // Generate a random price between 100 and 1000
  const price = Math.floor(Math.random() * 901) + 100;

  return {
    from: { country: fromCountry, airport: from },
    to: { country: toCountry, airport: to },
    departureTime,
    arrivalTime,
    isDirectFlight,
    stopoverCountry,
    airline,
    duration: durationString,
    price,
  };
}

module.exports = { generateRandomFlight };
