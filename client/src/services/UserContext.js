import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const User = ({ children }) => {
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [paswdConfirm, setConfirmPaswd] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [gender, setGender] = useState();

    const firstnameInputHandler = (enteredText) => {
        setFirstname(enteredText);
    };
    const lastnameInputHandler = (enteredText) => {
        setLastname(enteredText);
    };
    const emailInputHandler = (enteredText) => {
        setEmail(enteredText);
    };
    const passwordInputHandler = (enteredText) => {
        setPassword(enteredText);
    };
    const confirmPaswdInputHandler = (enteredText) => {
        setConfirmPaswd(enteredText);
    };
    const dayInputHandler = (enteredText) => {
        setDay(enteredText);
    };
    const monthInputHandler = (enteredText) => {
        setMonth(enteredText);
    };
    const yearInputHandler = (enteredText) => {
        setYear(enteredText);
    };
    const genderInputHandler = (enteredText) => {
        setGender(enteredText);
    };

    const userObject = { 
        "firstname": firstname, 
        "lastname": lastname,
        "email": email,
        "password": password,
        "paswdConfirm": paswdConfirm,
        "day": day,
        "month": month,
        "year": year,
        "gender": gender
    }

    return (
        <UserContext.Provider value={{
           firstname, firstnameInputHandler, lastname, lastnameInputHandler, email, emailInputHandler,
           password, passwordInputHandler, paswdConfirm, confirmPaswdInputHandler, day, setDay, dayInputHandler, month, setMonth, monthInputHandler, year, setYear, yearInputHandler, 
           gender, setGender, genderInputHandler, userObject
        }}>
            {children}
        </UserContext.Provider>
    );
};
