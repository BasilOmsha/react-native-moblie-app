const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const handlebars = require("handlebars");
const connectToDatabase = require('./connection/dbConnection.js');
require('dotenv').config({ path: __dirname + '/./../../.env' })

connectToDatabase();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('', require('./routes/routes.js'));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App listening port ${PORT}`));