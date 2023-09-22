const mongoose = require('mongoose');

// Define the Flight schema
const flightSchema = new mongoose.Schema({
    from: {
        country: {
            type: String,
            required: true
        },
        airport: {
            type: String,
            required: true
        },
    },
    to: {
        country: {
            type: String,
            required: true
        },
        airport: {
            type: String,
            required: true
        },
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    isDirectFlight: {
        type: Boolean,
        required: true
    },
    stopoverCountry: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    }
});

// Create the Flight model
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
