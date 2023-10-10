const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
        require: true
    },
    favoriteOneWayFlights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'favoriteOneWayFlights' // Reference to OneWayFlight schema
        },
    ],

    favoriteRoundTripFlights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'favoriteRoundTripFlights' // Reference to RoundTripFlight schema
        },
    ]
});

module.exports = mongoose.model('User', userSchema);