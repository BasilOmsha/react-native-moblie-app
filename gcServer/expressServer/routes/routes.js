const express = require('express');
const router = express.Router();
const passport = require('passport');
const { verifyCallback } = require('../helpers/authenticate.js');
const signupController = require('../controllers/signup.js');
const { validateSignupForm, validation } = require('../helpers/signup-validation.js');
const { getUserByEmail } = require('../controllers/getUserById.js');
const { updateUserByEmail } = require('../controllers/updateUserById.js');
const { validateProfileForm, validationProfile } = require('../helpers/userUpdate-valid.js');

// Signup page
router.get('/rest/services/registration', signupController.signupForm);

// Validate signup
router.post('/rest/services/clientValidation', validateSignupForm, validation);

// Validate update
router.post('/rest/services/updateValidation', validateProfileForm, validationProfile);

// JSON Signup function
router.post('/rest/services/signup', validateSignupForm, validation, signupController.signup);
//  application/x-www-form-urlencoded Signup function
router.post('/rest/services/signup2', validateSignupForm, validation, signupController.signup2);

router.post('/rest/services/login', verifyCallback);

router.post('/rest/services/getUserData', getUserByEmail);

router.put('/rest/services/updateUserData',validateProfileForm, validationProfile, updateUserByEmail);

router.get('/rest/services/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    try {
        res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!", exp: res.expires });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;