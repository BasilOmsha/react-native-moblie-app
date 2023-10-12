const express = require('express');
const router = express.Router();
const passport = require('passport');
const { verifyCallback } = require('../helpers/authenticate.js');
const signupController = require('../controllers/signup.js');
const { validateSignupForm, validation } = require('../helpers/signup-validation.js');
const { getUserById } = require('../controllers/getUserById.js');
const { updateUserById, updatePaswdById, checkExistingPswd } = require('../controllers/updateUserById.js');
const { validateProfileForm, validationProfile, validatePswdupdated, validationPswd } = require('../helpers/userUpdate-valid.js');
const { addFlightsToFavorite } = require('../controllers/addFavflights.js');
const { getFavoritesByUserId } = require('../controllers/readFavFlights.js');
const { deleteFavFlightsByid } = require('../controllers/deleFavFlights.js');


// Signup routes
router.get('/rest/services/registration', signupController.signupForm); //Web from
router.post('/rest/services/clientValidation', validateSignupForm, validation); // Validate signup
router.post('/rest/services/signup', validateSignupForm, validation, signupController.signup);// JSON Signup function
router.post('/rest/services/signup2', validateSignupForm, validation, signupController.signup2); //  application/x-www-form-urlencoded Signup function

// User Profile routes
router.post('/rest/services/getUserData', getUserById); // Get logged user's data
router.post('/rest/services/updateValidation', validateProfileForm, validationProfile); // validate update form 
router.post('/rest/services/pswdValidation', validatePswdupdated, validationPswd); // new paswds validation
router.put('/rest/services/updateUserData',validateProfileForm, validationProfile, updateUserById); // update user date
router.post('/rest/services/checkpswd', checkExistingPswd); // verify user current paswd
router.patch('/rest/services/updateUserPswd', validatePswdupdated, validationPswd, updatePaswdById); // Update user paswer
router.post('/rest/services/addToFavorite', addFlightsToFavorite);
router.post('/rest/services/readfav', getFavoritesByUserId);
router.post('/rest/services/deletefavFlight', deleteFavFlightsByid);

// Login routes
router.post('/rest/services/login', verifyCallback); // verify password and email
router.get('/rest/services/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => { // verify user token
    try {
        res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!", exp: res.expires });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;