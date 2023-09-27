import React from 'react';
import { useSignupFormContext } from './SignupLabelsContext';
import { useUserContext } from '../UserContext';

const ClearForm = () => {

    const {
        firstname, firstnameInputHandler, lastname, lastnameInputHandler,
        email, emailInputHandler, password, passwordInputHandler, day, dayInputHandler, setDay, userObject,
        month, setMonth, monthInputHandler, year, setYear, yearInputHandler, gender, setGender, genderInputHandler
    } = useUserContext();

    const { isFocusFname, setIsFocusFname, isFocusLname, setIsFocusLname,
        isFocusEmail, setIsFocusEmail, isFocusPaswd, setIsFocusPaswd, isFocusDay, setIsFocusDay,
        isFocusMonth, setIsFocusMonth, isFocusYear, setIsFocusYear, isFocusGender, setIsFocusGender, loading, setLoading,
        isRegistraionSuccess, setIsRegistraionSuccess, errortext, setErrortext, renderLablFName,
        renderLablLName, renderLablEmail, renderLablPaswd, renderLablDay, renderLablMonth,
        renderLablYear, renderLablGender } = useSignupFormContext();

    firstnameInputHandler('');
    lastnameInputHandler('');
    emailInputHandler('');
    passwordInputHandler('');
    dayInputHandler('');
    monthInputHandler('');
    yearInputHandler('');
    genderInputHandler('');

    setIsFocusFname(false);
    setIsFocusLname(false);
    setIsFocusEmail(false);
    setIsFocusPaswd(false);
    setIsFocusDay(false);
    setIsFocusMonth(false);
    setIsFocusYear(false);
    setIsFocusGender(false);

    setErrortext('');
}

export default ClearForm;