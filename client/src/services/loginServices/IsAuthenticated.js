import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const isAuthenticated = async (authContext, labelContext) => {
    labelContext.setLoading(true);
    let userToken = await EncryptedStorage.getItem('userToken');
    let userInfo = await EncryptedStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    userToken = JSON.parse(userToken);
    if (userToken) {
        const token = userToken.token.toString();
        const info = userInfo.user;
        console.log("token: " + token);
        try {
            let response = await fetch("http://10.0.2.2:3000/rest/services/protected", {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });

            let data = await response.json(); // Parse the response as JSON
            console.log("data: ", data); // Log the parsed data

            if (data.success === true || response.status === 201) {
                console.log("test2");
                authContext.setUserToken(token);
                authContext.setUserInfo(userInfo);
            } else {
                // await EncryptedStorage.removeItem('userToken');
                // await EncryptedStorage.removeItem('userInfo');
                authContext.setUserToken(null);
                authContext.setUserInfo(null);
            }
        } catch (err) {
            // await EncryptedStorage.removeItem('userToken');
            // await EncryptedStorage.removeItem('userInfo');
            console.log('No token or token invalidated : ' + err);
            authContext.setUserToken(null);
            authContext.setUserInfo(null);
        } finally {
            labelContext.setLoading(false);
        }
    } else {
        console.log('No token or token invalidated ');
        labelContext.setLoading(false);
    }
}

export default isAuthenticated;