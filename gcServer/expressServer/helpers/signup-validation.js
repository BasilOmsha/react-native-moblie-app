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
            .withMessage(`${month} is empty,`)
            .escape(),

        body(day)
            .trim()
            .notEmpty()
            .withMessage(`${day} is empty,`)
            .escape(),

        body(year)
            .trim()
            .notEmpty()
            .withMessage(`${year} is empty`)
            .escape(),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('E-mail field is empty')
            .isLength({ min: 1 })
            .withMessage('Email is too short')
            .normalizeEmail()
            .isEmail()
            .withMessage('Invalid email format')
            .custom(async (email) => {
                const user = await User.find({ email: email });
                if (user.length > 0) {
                    throw new Error('E-mail is already in use');
                }
                return true;
            })
            .withMessage('E-mail is already in use')
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
            .withMessage('Password must contain numbers, lowercase, uppercase, and symbols.')
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
    const agevarify = await calcAge(month, day, year) // validate age
    const values = { firstname, lastname, email, password, paswdConfirm, month, day, year, gender };
    // res.render('adduser', { errors, values, agevarify });
    res.json({ errors });
};

module.exports = {
    validateSignupForm,
    validation
};
