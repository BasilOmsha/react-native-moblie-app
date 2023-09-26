const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup.js');
const { validateSignupForm, validation } = require('../helpers/signup-validation.js');


// Signup page
router.get('/rest/services/registration', signupController.signupForm);

// JSON Signup function
router.post('/rest/services/signup', validateSignupForm, validation, signupController.signup);
//  application/x-www-form-urlencoded Signup function
router.post('/rest/services/signup2', validateSignupForm, validation, signupController.signup2);

module.exports = router;