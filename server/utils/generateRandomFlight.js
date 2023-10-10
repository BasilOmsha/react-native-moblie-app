const { europeanCountriesWithAirports, airlines } = require("../data");

function generateRandomFlight(
  from,
  to,
  startDate,
  fromCountry,
  toCountry,
  selectedAirline,
  selectedMaxDuration,
  selectedStops,
  fromCapitalCity,
  capitalCityTo
) {
  const flights = []; // Create an array to store flight objects
  const numberOfFlights = 10; // Number of flights for the same date

  for (let i = 0; i < numberOfFlights; i++) {
    const isDirectFlight = Math.random() < 0.5;

    // Check selectedStops filter
    if (
      (selectedStops === "Direct" && !isDirectFlight) ||
      (selectedStops === "One Stop" && isDirectFlight)
    ) {
      continue; // Skip the flight if it doesn't match the selectedStops filter
    }

    // Generate a random duration based on the user's input range
    let durationHours;
    if (selectedMaxDuration && selectedMaxDuration !== "Any Duration") {
      const [minHours, maxHours] = selectedMaxDuration
        .split("h")
        .map((str) => parseInt(str));
      durationHours =
        Math.floor(Math.random() * (maxHours - minHours + 1)) + minHours;
    } else {
      durationHours = isDirectFlight ? 4 : Math.floor(Math.random() * 10) + 1;
    }

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

    let airline;

    if (!selectedAirline || selectedAirline === "Airlines") {
      // If no airline filter is specified or "All Airlines" is selected, choose a random airline
      airline = airlines[Math.floor(Math.random() * airlines.length)];
    } else {
      // If a specific airline is selected, use it
      airline = selectedAirline;
    }

    // Calculate the duration string
    const duration = `${durationHours}h ${durationMinutes}m`;

    // Generate a random price within the specified range
    const price = Math.floor(Math.random() * 901) + 100;

    const flight = {
      from: {
        country: fromCountry,
        airport: from,
        capitalCity: fromCapitalCity,
      },
      to: { country: toCountry, airport: to, capitalCity: capitalCityTo },
      departureTime,
      arrivalTime,
      isDirectFlight,
      stopoverCountry,
      airline, // Assign the selected or random airline name
      duration,
      price,
    };

    flights.push(flight); // Add the flight object to the array
  }

  return flights; // Return the array of flight objects
}

module.exports = { generateRandomFlight };
