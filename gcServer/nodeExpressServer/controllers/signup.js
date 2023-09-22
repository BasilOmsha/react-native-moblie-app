const User = require('../models/User');
const encrypt = require("../helpers/paswdEncryption.js");

// Signupform
const signupForm = async (req, res) => {
    // res.send('My MVC App');
    res.render('adduser', {
        Title: "Signup Page - Flight Bookings"
    });
}

// CREATE A USER JSON http://localhost:3000/rest/services/signup
const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, month, day, year, gender } = req.body;
        const paswd = password;
        const hashedPaswd = await encrypt(paswd);
        // converting to Date string
        const date = `${day}.${month}.${year}`;

        // console.log(date);
        // console.log(req.body);

        if (!firstname || !lastname || !email || !paswd || !date) {
            res.status(400).send(
                { msg: 'info missing' }
            )
        } else {
            const newUser = {
                firstname: firstname, lastname: lastname, email: email,
                password: hashedPaswd, dob: date, gender: gender
            }
            // if (await checkEmail(email) === false) {
            const user = await User.insertMany(newUser);
            if (user) {
                res.status(201).redirect("../services/registration");
                console.log("user added successfully")
            } else {
                res.status(400).send("something went wrong!");
            }
        }

    } catch (error) {
        console.log(error);
        res.send(" Server side error creating a user");
    }
}

// CREATE A USER application/x-www-form-urlencoded http://localhost:3000/rest/services/signup2
const signup2 = async (req, res) => {
    try {
        const { firstname, lastname, email, password, month, day, year, gender } = req.body;
        const paswd = password;
        const hashedPaswd = await encrypt(paswd);
        // converting to Date string
        const date = `${day}.${month}.${year}`;
        const paivays = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = paivays.toLocaleDateString(options);

        // console.log(formattedDate);
        // console.log(req.body);

        if (!firstname || !lastname || !email || !paswd || !formattedDate) {
            res.status(400).send(
                { msg: 'info missing' }
            )
        } else {
            const newUser = {
                firstname: firstname, lastname: lastname, email: email,
                password: hashedPaswd, dob: formattedDate, gender: gender
            }
            // if (await checkEmail(email) === false) {
            const user = await User.insertMany(newUser);
            if (user) {
                res.status(201).redirect("../services/registration");
                console.log("user added successfully")
            } else {
                res.status(400).send("something went wrong!");
            }
        }

    } catch (error) {
        console.log(error);
        res.send(" Server side error creating a user");
    }
}

module.exports = {
    signupForm,
    signup,
    signup2
};
