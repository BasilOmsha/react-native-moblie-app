import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const UpdateUserInfo = async (userContext, labelContext) => {
    labelContext.setLoading(true);
    console.log(userContext.firstname);
    console.log(userContext.lastname);
    console.log(userContext.email);
    try {
        let response = await fetch("http://10.0.2.2:3000/rest/services/updateUserData", {
        // let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/updateUserData", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userContext.userUpdateObj)
        });
        if (!response.ok) {
            console.log("somthing2");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let json = await response.json();
        console.log("the user: " + json.user);
        if (!json) {
            // If there's an error response, update the error text
            updateError(json.msg, labelContext.setErrortext);
            labelContext.setLoading(false);
        } else {
            // userContext.set_id(json.user._id);
            userContext.setFirstname(json.user.firstname);
            userContext.setLastname(json.user.lastname);
            userContext.setEmail(json.user.email);
            const dobParts = json.user.dob.split('.');
            userContext.setDay(dobParts[0]);
            userContext.setMonth(dobParts[1]);
            userContext.setYear(dobParts[2]);
            userContext.setGender(json.user.gender);

        }
    } catch (error) {
        console.log("Update error: " + error);
        labelContext.setLoading(false);
    } finally {
        labelContext.setLoading(false);
    }
};

export default UpdateUserInfo;