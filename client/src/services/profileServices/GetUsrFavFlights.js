import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const GetUsrFavFlights = async (authContext, userContext, labelContext) => {
    console.log("Start");
    labelContext.setLoading(true);
    let userInfo = await EncryptedStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let info = "";
    if (userInfo) {
        info = userInfo.user.toString();
        console.log("SentUserId: " + info);
    }
    const idObj = { "_id": info };
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/readfav", {
            let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/readfav", {
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
        console.log("the Flights: " + json);
        if (!json) {
            // If there's an error response, update the error text
            updateError(json.msg, labelContext.setErrortext);
            labelContext.setLoading(false);
        } else {
            console.log("Favorite One Way Flights: ", json.favoriteOneWayFlights);

            console.log("");

            console.log("Favorite Round Trip Flights: ", json.favoriteRoundTripFlights);
            userContext.setFavoriteOneWayFlights(json.favoriteOneWayFlights);
            userContext.setFavoriteRoundTripFlights(json.favoriteRoundTripFlights);
            // userContext.setGender(json.user.gender);
            // console.log("Getting the fave flights data of : " + json.user._id);
        }
    } catch (error) {
        console.log("The error: " + error);
        labelContext.setLoading(false);
    } finally {
        labelContext.setLoading(false);
    }
};

export default GetUsrFavFlights;