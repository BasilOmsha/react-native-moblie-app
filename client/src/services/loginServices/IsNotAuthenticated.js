import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const IsNotAuthenticated = async (labelContext, authContext) => {
    let userToken = await EncryptedStorage.getItem('userToken');
    let userInfo = await EncryptedStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    userToken = JSON.parse(userToken);
    if (userToken) {
        const token = userToken.token.toString();
        const info = userInfo.user.toString();
        console.log("token: " + token);
        console.log("info: " + info);
        try {
            // let response = await fetch("http://10.0.2.2:3000/rest/services/protected", {
            let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/protected", {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });

            let data = await response.json(); // Parse the response as JSON
            console.log("data: ", data); // Log the parsed data

            if (data.success === false || response.status === 401) {
                console.log(response.status);
                await EncryptedStorage.removeItem('userToken');
                await EncryptedStorage.removeItem('userInfo');
                labelContext.setLoading(true);
                authContext.setUserToken(null);
                authContext.setUserInfo(null);

            } else {
                console.log("test2");
                authContext.setUserToken(token);
                authContext.setUserInfo(info);
            }
        } catch (err) {
            console.log('Error in IsNotAuthenticated:' + err);
            labelContext.setLoading(true);
            authContext.setUserToken(null);
            authContext.setUserInfo(null);
        }
    } else {
        console.log('No token or token invalidated');
    }
}

export default IsNotAuthenticated;