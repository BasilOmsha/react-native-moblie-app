const User = require('../models/User');
const bcrypt = require('bcrypt');
const { accessToken, refreshToken, issueJWT } = require('./generateTokens.js');

const verifyCallback = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({ success: false, msg: "Incorrect email or password!" });
        }
        const verify = await bcrypt.compare(password, user.password);
        console.log("Passwords match: " + verify);
        if (verify) {
            const refreshTokenObj = refreshToken(user);
            res.status(200).json({ success: true, user: user._id, token: refreshTokenObj.token, expiresIn: refreshTokenObj.expires });
        } else {
            res.status(401).json({ success: false, msg: "Incorrect email or password!" });
        }
    } catch (error) {
        return (error)
    }
}

module.exports = { verifyCallback };