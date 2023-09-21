const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup.js');

// const { validateSignupForm, validation } = require('../helpers/signup-validation.js');


// Signup page
router.get('/registration', signupController.signupForm);

// Signup function
router.post('/signup',  signupController.signup);



module.exports = router;