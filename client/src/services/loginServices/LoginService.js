import React, { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const updateError = (error, updateState) => {

    updateState(error);
    // setTimeout(() => {
    //     updateState('');
    // }, 5000)
}
const LoginService = async (userContext, authContext, labelContext) => {
    labelContext.setLoading(true);
    await EncryptedStorage.removeItem('userToken');
    await EncryptedStorage.removeItem('userInfo');
    await EncryptedStorage.removeItem('username');

    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/login", {
        let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userContext.loginObject)
        });
        let json = await response.json();
        // console.log(json);
        console.log(json.expiresIn);
        console.log(json.success);
        console.log(json.token);
        console.log(json.user);
        console.log();
        if (json.msg) {
            // If there's an error response, update the error text
            updateError(json.msg, labelContext.setErrortext);
            labelContext.setLoading(false);
        } else {
            const userToken = json.token;
            authContext.setUserToken(userToken);
            await EncryptedStorage.setItem('userToken', JSON.stringify({
                token: json.token,
            }));
            const userInfo = json.user;
            authContext.setUserInfo(userInfo);
            await EncryptedStorage.setItem('userInfo', JSON.stringify({
                user: json.user,
            }));
        }
    } catch (error) {
        console.log("The error: " + error);
        labelContext.setLoading(false);
        authContext.setUserToken(null);
        authContext.setUserInfo(null);
    } finally {
        labelContext.setLoading(false);
    }
};

export default LoginService;