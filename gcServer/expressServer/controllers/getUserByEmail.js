const User = require('../models/User');

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        console.log('User: ' + user);
        if (!user) {
            res.status(401).json({ success: false, msg: "User Not Foudn!" });
        } else {
            res.status(200).json({ success: true, user: user });
        }
    } catch (error) {
        res.status(401).json({ success: false, msg: "Something went wrong!" })
    }
}

module.exports = { getUserByEmail };