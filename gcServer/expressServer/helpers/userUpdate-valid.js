const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { calcAge } = require('./ageValidation.js');

const firstname = 'firstname';
const lastname = 'lastname';
const month = 'month';
const day = 'day';
const year = 'year';

const validateProfileForm =
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
            .custom(async (year, { req }) => {
                // Add age verification logic here
                const ageVerify = await calcAge(req.body.month, req.body.day, year);
                if (ageVerify) {
                    throw new Error('You must be 13 or older!');
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
            .custom(async (email, { req }) => {
                email = req.body.email;
                const id = req.body._id;
                console.log("terstestestete: " + email + " " + id)
                const user = await User.find({ email: email }, { _id: 1, email: 1 });
                // console.log("terstestesteti: " + user[0].email.toString() + " " + user[0]._id.toString())
                if (user.length > 0) {
                    if (user[0]._id.toString() !== id && user[0].email === email) {
                        throw new Error('Email is already in use!');
                    } else if (user[0]._id.toString() === id && user[0].email === email) {
                        console.log("good email");
                    } else if (user.length < 0) {
                        console.log("email is still the same");
                    } else if (user === null) {
                        console.log("new email updated");
                    }
                } else {
                    return true;
                }
            })
            // .withMessage('E-mail is already in use')
            .escape(),
    ];

const validationProfile = async (req, res, next) => {
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
    res.json({ errors });
};


const validatePswdupdated =
    [
        body('newPaswd')
            .trim()
            .notEmpty()
            .withMessage('New password field is empty')
            .isStrongPassword({
                minLength: 8,
                minUppercase: 1,
                minLowercase: 1,
                minSymbols: 1,
                minNumbers: 1
            })
            .withMessage('New password must be at least 8 characters, contain numbers, lowercase, uppercase, and symbols.')
            .escape(),

        body('paswdConfirm')
            .trim()
            .notEmpty()
            .withMessage('New confirmed password field is empty')
            .custom(async (value, { req }) => {
                if (value !== await req.body.newPaswd) {
                    throw new Error('New passowrds do not match');
                }
                return true
            })
    ];


const validationPswd = async (req, res, next) => {
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
    res.json({ errors });
};


module.exports = {
    validateProfileForm,
    validationProfile,
    validatePswdupdated,
    validationPswd
};
