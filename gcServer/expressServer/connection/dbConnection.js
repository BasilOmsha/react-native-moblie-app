const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/../../../../../../keys/flightBookingApp/.env` });

const dbURI = process.env.MONGODB_URI;

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDatabase = async () => {
    mongoose.connect(dbURI, dbOptions)
        .then(result => console.log("Database connected"))
        .catch(error => console.log(error));
};

module.exports = connectToDatabase;