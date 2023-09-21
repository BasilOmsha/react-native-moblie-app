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
    bookedFlights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
});

module.exports = mongoose.model('User', userSchema);