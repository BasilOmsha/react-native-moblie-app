import React, { useState } from 'react';

const updateError = (error, updateState) => {

    updateState(error);
}
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
const CheckCurrent = async (userContext, labelContext) => {
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/checkpswd", {
            let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/checkpswd", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userContext.pswdObject)
        });
        let json = await response.json();
        console.log("status: " + response.status);
        if (!response.ok) {
            console.log("somthing3")
            console.log(`! Status: ${response.status}`);
            updateError(json.msg, labelContext.setErrortext);
            return false;
        }
        else {
            console.log("msg: " + json.msg);
            updateError(json.msg, labelContext.setErrortext);
            return true;
        }
    } catch (error) {
        console.log("The error: " + error);
    }
};

const UpdatePswd = async (userContext, labelContext, authContext) => {
    labelContext.setLoading(true);
    try {
        // let response = await fetch("http://10.0.2.2:3000/rest/services/updateUserPswd", {
            let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/updateUserPswd", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userContext.newPswdObj)
        });
        let json = await response.json();
        console.log("status: " + response.status);
        if (!response.ok) {
            console.log("somthing3")
            console.log(`! Status: ${response.status}`);
            updateError(json.msg, labelContext.setErrortext);
            labelContext.setLoading(false);
        }
        if(!json){
            updateError(json.msg, labelContext.setErrortext);
            labelContext.setLoading(false);
        }else {
            labelContext.setErrortext(json.msg);
            userContext.setCurrentPswd('');
            userContext.setNewPaswd('');
            userContext.setConfirmPaswd('');
            labelContext.setLoading(false);
            await delay(1000);
            authContext.logout();
            
        }
    } catch (error) {
        console.log("The error: " + error);
        labelContext.setLoading(false);
    }
};

export {CheckCurrent, UpdatePswd};