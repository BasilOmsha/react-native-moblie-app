import React from 'react';
import { useUserContext } from '../UserContext';

const updateError = (error, updateState) => {
    updateState(error);
}

const UpdateValid = async (userUpdateObj, setErrortext) => {
    const { _id, firstname, lastname, email, day, month, year } = userUpdateObj;
    try {
         let response = await fetch("http://10.0.2.2:3000/rest/services/updateValidation",
        //  let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/updateValidation",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userUpdateObj)
            });
        if (response.status === 404) {
            // Handle 404 error gracefully
            updateError("Resource not found", setErrortext);
            return false; // Indicate that the form is not valid
        }
        let json = await response.json();
        if (json.errors.firstname) {
            // return updateError('First name should be at least two characters!', setErrors);
            return updateError(json.errors.firstname, setErrortext);
        }
        if (json.errors.lastname) {
            return updateError(json.errors.lastname, setErrortext);
        }
        if (json.errors.email) {
            return updateError(json.errors.email, setErrortext);
        }
        if (json.errors.day) {
            return updateError(json.errors.day, setErrortext);
        }
        if (json.errors.month) {
            return updateError(json.errors.month, setErrortext);
        }
        if (json.errors.year) {
            return updateError(json.errors.year, setErrortext);
        }
        return false;
    } catch (error) {
        console.log("The error: " + error);
        updateError("An error occurred while validating the form.", setErrortext);
        return false; // Indicate that the form is not valid
    }
}

const PswdValid = async (newPswdObj, setErrortext) => {
    const { newPaswd, paswdConfirm } = newPswdObj;
    try {
        //  let response = await fetch("http://10.0.2.2:3000/rest/services/pswdValidation",
         let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/pswdValidation",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPswdObj)
            });
        if (response.status === 404) {
            // Handle 404 error gracefully
            updateError("Resource not found", setErrortext);
            return false; // Indicate that the form is not valid
        }
        let json = await response.json();
        if (json.errors.newPaswd) {
            // return updateError('First name should be at least two characters!', setErrors);
            return updateError(json.errors.newPaswd, setErrortext);
        }
        if (json.errors.paswdConfirm) {
            return updateError(json.errors.paswdConfirm, setErrortext);
        }
        return false;
    } catch (error) {
        console.log("The error: " + error);
        updateError("An error occurred while validating the form.", setErrortext);
        return false; // Indicate that the form is not valid
    }
}

export { UpdateValid, PswdValid};