import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const GetUserData = async (authContext, userContext, labelContext) => {
    labelContext.setLoading(true);
    let userInfo = await EncryptedStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let info = "";
    if (userInfo) {
        info = userInfo.user.toString();
        console.log("info123: " + info);
    }
    const idObj = { "_id": info };
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/getUserData", {
        let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/getUserData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idObj)
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
            userContext.set_id(json.user._id);
            userContext.setFirstname(json.user.firstname);
            userContext.setLastname(json.user.lastname);
            userContext.setEmail(json.user.email);
            const dobParts = json.user.dob.split('.');
            userContext.setDay(dobParts[0]);
            userContext.setMonth(dobParts[1]);
            userContext.setYear(dobParts[2]);
            userContext.setGender(json.user.gender);
            console.log("Getting the data of: " + json.user._id);
        }
    } catch (error) {
        console.log("The error: " + error);
        labelContext.setLoading(false);
    } finally {
        labelContext.setLoading(false);
    }
};

export default GetUserData;