import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const DeleteFavFlight = async (flightID, userContext, labelContext) => {
    // labelContext.setLoading(true);
    // console.log(favOneWayFlight);
    const deleteObj = {
        "user_id": userContext._id,
        "_id": flightID
    }
    try {
        let response = await fetch("http://10.0.2.2:3000/rest/services/deletefavFlight", {
            // let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/deletefavFlight", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteObj)
        });
        if (!response == 201) {
            console.log("somthing")
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let json = await response.json();
        console.log("the Flights: " + json);
        if (!json) {
            // If there's an error response, update the error text
            updateError(json.error, labelContext.setErrortext);
            labelContext.setLoading(false);
        } else {
            console.log(json.msg);
            console.log("");

        }
    } catch (error) {
        console.log("The error: " + error);
        labelContext.setLoading(false);
    } finally {
        labelContext.setLoading(false);
    }
};

export default DeleteFavFlight;