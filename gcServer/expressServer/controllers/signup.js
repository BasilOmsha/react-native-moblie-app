const User = require('../models/User');
const encrypt = require("../helpers/paswdEncryption.js");

// Signupform
const signupForm = async (req, res) => {
    // res.send('My MVC App');
    res.render('adduser', {
        Title: "Signup Page - Flight Bookings"
    });
}


// Signup function. creating a user
const signup = async (req, res) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const paswd = req.body.password;
        const hashedPaswd = await encrypt(paswd);
        const month = req.body.month;
        const day = req.body.day;
        const year = req.body.year;
        // converting to Date string
        const date = `${day}.${month}.${year}`
        const paivays = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = paivays.toLocaleDateString(options);
        // console.log(formattedDate);
        const gender = req.body.gender;

        // console.log(req.body);
        // const paivays = new Date()

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
                res.status(201).redirect("../registration");
                console.log("user added successfully")
            } else {
                res.status(400).send("something went wrong!");
            }
            // } else {
            //     return res.status(403).send("Email already in use!!!");
            // }
        }

    } catch (error) {
        console.log(error);
        res.send(" Server side error creating a user");
    }
}

module.exports = {
    signupForm,
    signup
};
