const User = require('../models/User');

const updateUserByEmail = async (req, res) => {
    try {
        const { _id, firstname, lastname, email, month, day, year, gender } = req.body;
        const date = `${day}.${month}.${year}`;
        if (!firstname || !lastname || !email || !date) {
            res.status(400).send(
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

module.exports = { updateUserByEmail };