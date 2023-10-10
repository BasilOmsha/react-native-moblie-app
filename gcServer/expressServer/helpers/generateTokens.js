const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
// const pathToKey = path.join(__dirname, '/../../../../../../keys/flightBookingApp/', 'id_rsa_priv.pem');
const pathToKey = path.join(__dirname, '../', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const refreshToken = user => {
    const email = user.email;

    const limit = 60 * 60 * 24// 3600 seconds or 1h
    const expiresIn = Math.floor(Date.now() / 1000) + limit 

    const payload = {
        sub: email,
        exp: expiresIn,
        iat: Date.now(),
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
};

module.exports = { refreshToken };
