const User = require('../models/User');
const bcrypt = require('bcrypt');
const encrypt = require("../helpers/paswdEncryption.js");

const updateUserById = async (req, res) => {
    try {
        const { _id, firstname, lastname, email, month, day, year, gender } = req.body;
        const date = `${day}.${month}.${year}`;
        if (!firstname || !lastname || !email || !date) {
            return res.status(400).json(
                { msg: 'info missing' }
            )
        } else {
            const user = await User.updateOne({ _id: _id }, {
                $set: {
                    firstname: firstname, lastname: lastname,
                    email: email, dob: date, gender: gender
                }
            })
            if (user) {
                res.status(202).json({ success: true, user: user });
                console.log("user updated successfully")
            } else {
                res.status(400).json({ success: false, msg: "something went wrong!" });
            }
        }
    } catch (error) {
        res.status(401).json({ success: false, msg: "Server side error updating the user!" })
    }
}

const checkExistingPswd = async (req, res) => {
    try {
        const { _id, currentPswd } = req.body;
        if (!currentPswd || !_id) {
            return res.status(400).json({ msg: 'Password missing!' })
        }
        const user = await User.findOne({ _id: _id });
        console.log("user: " + user._id + " = " + _id);
        if (!user._id) {
            res.status(401).json({ success: false, msg: "User doesn't exist!" });
            console.log("User doesn't exist!");
        }
        const verify = await bcrypt.compare(currentPswd, user.password);
        if (verify){
            res.status(200).json({ success: true, msg: "", verify: verify });
            console.log("Passwords match: " + verify);
        } else {
            res.status(401).json({ success: false, msg: "Incorrect password!", verify: verify });
            console.log("Incorrect password: ");
        }
       
    } catch (error) {
        res.status(401).json({ success: false, msg: "Server side error updating the user!" })
    }
}

const updatePaswdById = async (req, res) => {
    try {
        const { _id, newPaswd } = req.body;
        const hashedPaswd = await encrypt(newPaswd);
        const updatePswd = await User.updateOne({ _id: _id }, { $set: { password: hashedPaswd } })
        if (updatePswd) {
            res.status(202).json({ success: true, msg: "Password updated successfuly!" });
            console.log("pssword updated successfully");
        } else {
            res.status(400).json({ success: false, msg: "something went wrong!" });
        }

    } catch (error) {
        res.status(401).json({ success: false, msg: "Server side error updating the user!" })
    }
}

module.exports = { updateUserById, checkExistingPswd, updatePaswdById };