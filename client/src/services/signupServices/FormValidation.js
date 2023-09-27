import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSignupFormContext } from './SignupLabelsContext';
import { useUserContext } from '../UserContext';


const updateError = (error, updateState) => {
    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}

const FormValidation3 = async (userObject, setErrors) => {
    const { day, month, year } = userObject;
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/clientValidation",
        let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/clientValidation",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
        if (response.status === 404) {
            // Handle 404 error gracefully
            updateError("Resource not found", setErrors);
            return false; // Indicate that the form is not valid
        }
        let json = await response.json();
        if (json.errors.day) {
            return updateError(json.errors.day, setErrors);
        }
        if (json.errors.month) {
            return updateError(json.errors.month, setErrors);
        }
        if (json.errors.year) {
            return updateError(json.errors.year, setErrors);
        }
        return false;
    } catch (error) {
        console.log("The error: " + error);
        updateError("An error occurred while validating the form.", setErrors);
        return false; // Indicate that the form is not valid
    }
}

const FormValidation2 = async (userObject, setErrors) => {
    const { email, password, paswdConfirm } = userObject;
    try {
         // let response = await fetch("http://10.0.2.2:3000/rest/services/clientValidation",
         let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/clientValidation",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
        if (response.status === 404) {
            // Handle 404 error gracefully
            updateError("Resource not found", setErrors);
            return false; // Indicate that the form is not valid
        }
        let json = await response.json();
        if (json.errors.email) {
            return updateError(json.errors.email, setErrors);
        }
        if (json.errors.password) {
            return updateError(json.errors.password, setErrors);
        }
        if (json.errors.paswdConfirm) {
            return updateError(json.errors.paswdConfirm, setErrors);
        }
        return false;
    } catch (error) {
        console.log("The error: " + error);
        updateError("An error occurred while validating the form.", setErrors);
        return false; // Indicate that the form is not valid
    }
}

const FormValidation1 = async (userObject, setErrors) => {
    const { firstname, lastname } = userObject;
    try {
         // let response = await fetch("http://10.0.2.2:3000/rest/services/clientValidation",
         let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/clientValidation",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
        if (response.status === 404) {
            // Handle 404 error gracefully
            updateError("Resource not found", setErrors);
            return false; // Indicate that the form is not valid
        }
        let json = await response.json();
        if (json.errors.firstname) {
            // return updateError('First name should be at least two characters!', setErrors);
            return updateError(json.errors.firstname, setErrors);
        }
        if (json.errors.lastname) {
            return updateError(json.errors.lastname, setErrors);
        }
        return false;
    } catch (error) {
        console.log("The error: " + error);
        updateError("An error occurred while validating the form.", setErrors);
        return false; // Indicate that the form is not valid
    }
}

const FormValidation = async (userObject, setErrors) => {
    // Destructuring the necessary values from userObject
    const { firstname, lastname, email, password, day, month, year } = userObject;
    try {
         // let response = await fetch("http://10.0.2.2:3000/rest/services/clientValidation",
         let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/clientValidation",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
        if (response.status === 404) {
            // Handle 404 error gracefully
            updateError("Resource not found", setErrors);
            return false; // Indicate that the form is not valid
        }
        let json = await response.json();
        if (!firstname && !lastname && !email && !password && !day && !month && !year) {
            // alert('Please fill the first name field');
            return updateError('All fields are required!', setErrors);
        }
        if (json.errors.firstname) {
            // return updateError('First name should be at least two characters!', setErrors);
            return updateError(json.errors.firstname, setErrors);
        }
        if (json.errors.lastname) {
            return updateError(json.errors.lastname, setErrors);
        }
        if (json.errors.email) {
            return updateError(json.errors.email, setErrors);
        }
        if (json.errors.password) {
            return updateError(json.errors.password, setErrors);
        }
        if (json.errors.paswdConfirm) {
            return updateError(json.errors.paswdConfirm, setErrors);
        }
        if (json.errors.day) {
            return updateError(json.errors.day, setErrors);
        }
        if (json.errors.month) {
            return updateError(json.errors.month, setErrors);
        }
        if (json.errors.year) {
            return updateError(json.errors.year, setErrors);
        }
        return false;
    } catch (error) {
        console.log("The error: " + error);
        updateError("An error occurred while validating the form.", setErrors);
        return false; // Indicate that the form is not valid
    }
}

export { FormValidation, FormValidation1, FormValidation2, FormValidation3};