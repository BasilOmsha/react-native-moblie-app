import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const GetUserDataByEmail = async (authContext, userContext, labelContext) => {
    labelContext.setLoading(true);
    let userInfo = await EncryptedStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let info = "";
    if (userInfo) {
        info = userInfo.user.toString();
        console.log("info123: " + info);
    }
    const emailObj = { "email": info };
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/getUserData", {
        let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/getUserData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailObj)
        });
        if (!response.ok) {
            console.log("somthing")
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let json = await response.json();
        console.log("the user: " + json.user);
        if (!json) {
            // If there's an error response, update the error text
            updateError(json.msg, labelContext.setErrortext);
            labelContext.setLoading(false);
        } else {
            userContext.firstname = json.user.firstname;
            userContext.lastname = json.user.lastname;
            userContext.email = json.user.email;
            const dobParts = json.user.dob.split('.');
            // Parse the parts as integers
            userContext.day = dobParts[0];
            userContext.month = dobParts[1];
            userContext.year = dobParts[2];
            userContext.gender = json.user.gender;

        }
    } catch (error) {
        console.log("The error: " + error);
        labelContext.setLoading(false);
    } finally {
        labelContext.setLoading(false);
    }
};

export default GetUserDataByEmail;