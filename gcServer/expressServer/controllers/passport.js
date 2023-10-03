const User = require('../models/User');
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
// const pathToKey = path.join(__dirname, '/../../../../../../keys/flightBookingApp/', 'id_rsa_pub.pem');
const pathToKey = path.join(__dirname, '../', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const passport = require('passport');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = PUB_KEY;
opts.algorithms = ['RS256'];


module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

        console.log(jwt_payload);

        User.find({ email: jwt_payload.sub })
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => done(err, null));

    }));
}