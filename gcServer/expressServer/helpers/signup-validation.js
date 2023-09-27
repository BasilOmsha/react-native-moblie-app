const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { calcAge } = require('./ageValidation.js');

const firstname = 'firstname';
const lastname = 'lastname';
const month = 'month';
const day = 'day';
const year = 'year';

const validateSignupForm =
    [
        body(firstname)
            .trim()
            .notEmpty()
            .withMessage(`${firstname} is empty`)
            .isLength({ min: 2 })
            .withMessage('The first name is too short')
            .escape(), //  To prevent Cross-Site Scripting vulnerability (XSS).

        body(lastname)
            .trim()
            .notEmpty()
            .withMessage(`${lastname} is empty`)
            .isLength({ min: 2 })
            .withMessage('The last name is too short')
            .escape(),

        body(month)
            .trim()
            .notEmpty()
            .withMessage(`${month} is empty`)
            .escape(),

        body(day)
            .trim()
            .notEmpty()
            .withMessage(`${day} is empty`)
            .escape(),

        body(year)
            .trim()
            .notEmpty()
            .withMessage(`${year} is empty`)
            .custom(async (value, { req }) => {
                // Add age verification logic here
                const ageVerify = await calcAge(req.body.month, req.body.day, value);
                if (ageVerify) {
                    throw new Error('You must be older than 13 to use our service');
                }
                return true;
            })
            .escape(),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email field is empty')
            .isLength({ min: 1 })
            .withMessage('Email is too short')
            .normalizeEmail()
            .isEmail()
            .withMessage('Invalid email format')
            .custom(async (email) => {
                const user = await User.find({ email: email });
                if (user.length > 0) {
                    throw new Error('Email is already in use');
                }
                return true;
            })
            .withMessage('Email is already in use')
            .escape(),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password field is empty')
            .isStrongPassword({
                minLength: 8,
                minUppercase: 1,
                minLowercase: 1,
                minSymbols: 1,
                minNumbers: 1
            })
            .withMessage('Password must be at least 8 characters, contain numbers, lowercase, uppercase, and symbols.')
            .escape(),

        body('paswdConfirm')
            .trim()
            .notEmpty()
            .withMessage('Confirmed password field is empty')
            .custom(async (value, { req }) => {
                if (value !== await req.body.password) {
                    throw new Error('Passowrds do not match');
                }
                return true
            })
    ];


const validation = async (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) {
        return next();
    }
    const errors = {};
    result.forEach((error) => {
        const field = error.path;
        const message = error.msg;
        errors[field] = message;
    });
    console.log(errors);
    const { firstname, lastname, email, password, paswdConfirm, month, day, year, gender } = req.body;
//     const agevarify = await calcAge(month, day, year) // validate age
//     if (agevarify) {
//     errors['age'] = 'You must be older than 13 to use our service!';
//   }
    const values = { firstname, lastname, email, password, paswdConfirm, month, day, year, gender };
    // res.render('adduser', { errors, values });
    res.json({ errors });
};

module.exports = {
    validateSignupForm,
    validation
};
