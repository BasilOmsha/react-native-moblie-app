const mongoose = require('mongoose');

const oneWayFavFlightSchema = new mongoose.Schema({
    from: {
        country: String,
        airport: String,
        capitalCity: String
    },
    to: {
        country: String,
        airport: String,
        capitalCity: String
    },
    departureTime: Date,
    arrivalTime: Date,
    isDirectFlight: Boolean,
    stopoverCountry: String,
    airline: String,
    duration: String,
    price: Number
});

const roundTripFavFlightSchema = new mongoose.Schema({
    outbound: oneWayFavFlightSchema,
    return: oneWayFavFlightSchema
});

// const tripSchema = new mongoose.Schema({
//     outboundFlights: [oneWayFlightSchema], // Array of one-way flights
//     returnFlights: [roundTripFlightSchema], // Array of round-trip flights
//     capitalCityFrom: String,
//     capitalCityTo: String
// });

const FaveOneWayFlight = mongoose.model('favoriteOneWayFlights', oneWayFavFlightSchema);
const FaveRoundTripFlight = mongoose.model('favoriteRoundTripFlights', roundTripFavFlightSchema);
// const Trip = mongoose.model('Trip', tripSchema);

module.exports = {
    FaveOneWayFlight,
    FaveRoundTripFlight,
    // Trip
};