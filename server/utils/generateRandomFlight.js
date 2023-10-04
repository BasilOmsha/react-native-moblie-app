// utils/generateRandomFlight.js
const { europeanCountriesWithAirports, airlines } = require("../data");

function generateRandomFlight(from, to, startDate, fromCountry, toCountry) {
  const flights = []; // Create an array to store flight objects
  const numberOfFlights = 10; // Number of flights for the same date

  for (let i = 0; i < numberOfFlights; i++) {
    const isDirectFlight = Math.random() < 0.5;
    const durationHours = isDirectFlight
      ? 4
      : Math.floor(Math.random() * 10) + 1;

    const durationMinutes = isDirectFlight ? 0 : Math.floor(Math.random() * 60);

    // Generate a random departure time within the specified date
    const departureTime = new Date(
      startDate.getTime() + Math.random() * 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    );

    const arrivalTime = new Date(
      departureTime.getTime() +
        (durationHours * 60 + durationMinutes) * 60 * 1000
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

    const flight = {
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

    flights.push(flight); // Add the flight object to the array
  }

  return flights; // Return the array of flight objects
}

module.exports = { generateRandomFlight };
