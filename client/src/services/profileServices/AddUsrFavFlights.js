import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const AddUsrFavFlights = async (authContext, labelContext, userContext, selectedFlightGlobal) => {
    // labelContext.setLoading(true);
    const favOneWayFlight = { 
        "_id": userContext._id,
        "outboundFlights": [
            {
                "from": {
                    "country": selectedFlightGlobal.from.country,
                    "airport": selectedFlightGlobal.from.airport,
                    "capitalCity": selectedFlightGlobal.from.capitalCity,
                },
                "to": {
                    "country": selectedFlightGlobal.to.country,
                    "airport": selectedFlightGlobal.to.airport,
                    "capitalCity": selectedFlightGlobal.to.capitalCity
                },
                "departureTime": selectedFlightGlobal.departureTime,
                "arrivalTime": selectedFlightGlobal.arrivalTime,
                "isDirectFlight": selectedFlightGlobal.isDirectFlight,
                "stopoverCountry": selectedFlightGlobal.stopoverCountry,
                "airline": selectedFlightGlobal.airline,
                "duration": selectedFlightGlobal.duration,
                "price": selectedFlightGlobal.price
            }
        ],
        "returnFlights": [],
        "capitalCityFrom": selectedFlightGlobal.capitalCityFrom,
        "capitalCityTo": selectedFlightGlobal.capitalCityTo
    };
    console.log(favOneWayFlight);
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/addToFavorite", {
            let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/addToFavorite", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favOneWayFlight)
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

export default AddUsrFavFlights;