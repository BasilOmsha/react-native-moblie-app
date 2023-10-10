const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const mongoose = require('mongoose');
const handlebars = require("handlebars");
const cors = require("cors");
const connectToDatabase = require('./connection/dbConnection.js');

connectToDatabase();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(cors());

require('./controllers/passport')(passport);

app.use('', require('./routes/routes.js'));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening port ${PORT}...`));