const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const handlebars = require("handlebars");
const connectToDatabase = require('./connection/dbConnection.js');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening port ${PORT}...`));