const mongoose = require("mongoose");
require("dotenv");

const URL = process.env.DB_URL;

const db_Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbConnection = async () => {
  mongoose
    .connect(URL, db_Options)
    .then((result) => console.log("Database connected"))
    .catch((error) => console.log(error));
};

module.exports = dbConnection;
