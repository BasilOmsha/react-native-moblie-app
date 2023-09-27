// Sigup Form Lables Handler
import React, { createContext, useContext, useState } from 'react';
import { Text } from 'react-native';
import styles from '../../styles/SignupStyle';
import Loader from '../Loader';
const SignupFormContext = createContext();

export const useSignupFormContext = () => {
    return useContext(SignupFormContext);
};

export const Labels = ({ children }) => {
    const [isFocusFname, setIsFocusFname] = useState(false);
    const [isFocusLname, setIsFocusLname] = useState(false);
    const [isFocusEmail, setIsFocusEmail] = useState(false);
    const [isFocusPaswd, setIsFocusPaswd] = useState(false);
    const [isFocusConfPaswd, setIsFocusConfPaswd] = useState(false);
    const [isFocusDay, setIsFocusDay] = useState(false);
    const [isFocusMonth, setIsFocusMonth] = useState(false);
    const [isFocusYear, setIsFocusYear] = useState(false);
    const [isFocusGender, setIsFocusGender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [errortext, setErrortext] = useState('');

    const renderLablFName = () => {
        if (isFocusFname) {
            return (
                <Text style={[styles.label, isFocusFname && { color: 'blue' }]}>
                    First Name
                </Text>
            );
        }
        return null;
    }
    const renderLablLName = () => {
        if (isFocusLname) {
            return (
                <Text style={[styles.label, isFocusLname && { color: 'blue' }]}>
                    Last Name
                </Text>
            );
        }
        return null;
    }

    const renderLablEmail = () => {
        if (isFocusEmail) {
            return (
                <Text style={[styles.label, isFocusEmail && { color: 'blue' }]}>
                    Email
                </Text>
            );
        }
        return null;
    }

    const renderLablPaswd = () => {
        if (isFocusPaswd) {
            return (
                <Text style={[styles.label, isFocusPaswd && { color: 'blue' }]}>
                    Password
                </Text>
            );
        }
        return null;
    }

    const renderLablConfPaswd = () => {
        if (isFocusConfPaswd) {
            return (
                <Text style={[styles.label, isFocusConfPaswd && { color: 'blue' }]}>
                    Confirm Password
                </Text>
            );
        }
        return null;
    }

    const renderLablDay = () => {
        if (isFocusDay) {
            return (
                <Text style={[styles.label, isFocusDay && { color: 'blue' }]}>
                    Day
                </Text>
            );
        }
        return null;
    }
    const renderLablMonth = () => {
        if (isFocusMonth) {
            return (
                <Text style={[styles.label, isFocusMonth && { color: 'blue' }]}>
                    Month
                </Text>
            );
        }
        return null;
    }
    const renderLablYear = () => {
        if (isFocusYear) {
            return (
                <Text style={[styles.label, isFocusYear && { color: 'blue' }]}>
                    Year
                </Text>
            );
        }
        return null;
    }
    const renderLablGender = () => {
        if (isFocusGender) {
            return (
                <Text style={[styles.label, isFocusGender && { color: 'blue' }]}>
                    Gender
                </Text>
            );
        }
        return null;
    }

    return (
        <SignupFormContext.Provider value={{
            isFocusFname,
            setIsFocusFname,
            isFocusLname,
            setIsFocusLname,
            isFocusEmail,
            setIsFocusEmail,
            isFocusPaswd,
            setIsFocusPaswd,
            isFocusConfPaswd,
            setIsFocusConfPaswd,
            isFocusDay,
            setIsFocusDay,
            isFocusMonth,
            setIsFocusMonth,
            isFocusYear,
            setIsFocusYear,
            isFocusGender,
            setIsFocusGender,
            loading,
            setLoading,
            isRegistraionSuccess,
            setIsRegistraionSuccess,
            errortext,
            setErrortext,
            renderLablFName,
            renderLablLName,
            renderLablEmail,
            renderLablPaswd,
            renderLablConfPaswd,
            renderLablDay,
            renderLablMonth,
            renderLablYear,
            renderLablGender
        }}>
            {children}
        </SignupFormContext.Provider>
    );
}