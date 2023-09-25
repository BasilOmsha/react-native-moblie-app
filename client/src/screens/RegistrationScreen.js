import React, { useState } from 'react';
import {
    StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useUserContext } from '../components/UserContext';
import { useSignupFormContext } from '../components/signupComponents/SignupLabelsContext';
import { daysOfMonth, monthsInNumbers, years, genders } from '../components/signupComponents/DateData';
import Loader from '../components/Loader';
import SuccessModal from '../components/signupComponents/SuccessModal';
import styles from '../styles/Style';

const RegistrationScreen = ({ navigation }) => {
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


    const clearForm = () => {
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

    const handleSubmitButton = async () => {
        setErrortext('');
        if (!firstname) {
            alert('Please fill the first name field');
            return;
        }
        if (!lastname) {
            alert('Please fill the last name field');
            return;
        }
        if (!email) {
            alert('Please add an email');
            return;
        }
        if (!password) {
            alert('Please create password');
            return;
        }
        if (!day) {
            alert('Please select a day');
            return;
        }
        if (!month) {
            alert('Please select a month');
            return;
        }
        if (!year) {
            alert('Please select a year');
            return;
        }
        console.log("test!");

        setLoading(true);
        try {
            let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/signup",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userObject)
                });
            let json = await response.json();
            console.log("json res: " + JSON.stringify(json));
            setIsRegistraionSuccess(true);
        }
        catch (error) {
            console.log("The error: " + error);
            setLoading(false);
        }
        finally {
            clearForm();
            setLoading(false);
        }
    }
    const navToLogin = () => {
        navigation.navigate('Login');
        setIsRegistraionSuccess(false);
    }

    if (isRegistraionSuccess) {
        return (
            <SuccessModal navToLogin={navToLogin}/>
        );
    }

    return (
        <View style={styles.mainSignupContainer}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/images/airplain.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                {/*<KeyboardAvoidingView enabled> */}

                <View style={styles.SectionStyle}>
                    {renderLablFName()}
                    <TextInput
                        style={[styles.inputStyle, isFocusFname && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!isFocusFname ? 'First Name' : 'First Name'}
                        placeholderTextColor="#777777"
                        onFocus={() => setIsFocusFname(true)}
                        onBlur={() => setIsFocusFname(true)}
                        onChange={item => {
                            // setValue(item.value);
                            setIsFocusFname(true);
                        }}
                        onChangeText={firstnameInputHandler}
                        value={firstname}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    {renderLablLName()}
                    <TextInput
                        style={[styles.inputStyle, isFocusLname && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!isFocusFname ? 'Last Name' : 'Last Name'}
                        placeholderTextColor="#777777"
                        onFocus={() => setIsFocusLname(true)}
                        onBlur={() => setIsFocusLname(true)}
                        onChangeText={lastnameInputHandler}
                        value={lastname}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    {renderLablEmail()}
                    <TextInput
                        style={[styles.inputStyle, isFocusEmail && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!isFocusEmail ? 'Email' : 'Email'}
                        placeholderTextColor="#777777"
                        onFocus={() => setIsFocusEmail(true)}
                        onBlur={() => setIsFocusEmail(true)}
                        onChangeText={emailInputHandler}
                        value={email}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    {renderLablPaswd()}
                    <TextInput
                        style={[styles.inputStyle, isFocusPaswd && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        secureTextEntry={true}
                        placeholder={!isFocusPaswd ? 'Password' : 'Password'}
                        placeholderTextColor="#777777"
                        onFocus={() => setIsFocusPaswd(true)}
                        onBlur={() => setIsFocusPaswd(true)}
                        onChangeText={passwordInputHandler}
                        value={password}
                    />
                </View>
                {/* <View style={styles.DateSectionContainerStyle}> */}
                <View style={styles.dobContainer}>
                    {renderLablDay()}
                    <Dropdown
                        style={[styles.dropdown, isFocusDay && { borderColor: 'blue' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        placeholderTextColor="#777777"
                        data={daysOfMonth}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusDay ? 'Select Day' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => setIsFocusDay(true)}
                        onBlur={() => setIsFocusDay(true)}
                        onChange={item => {
                            setDay(item.value);
                            setIsFocusDay(false);
                        }}
                        onChangeText={dayInputHandler}
                        value={day}
                    />
                </View>
                <View style={styles.dobContainer}>
                    {renderLablMonth()}
                    <Dropdown
                        style={[styles.dropdown, isFocusMonth && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={monthsInNumbers}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusMonth ? 'Select Month' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => setIsFocusMonth(true)}
                        onBlur={() => setIsFocusMonth(true)}
                        onChange={item => {
                            setMonth(item.value);
                            setIsFocusMonth(false);
                        }}
                        onChangeText={monthInputHandler}
                        value={month}
                    />
                </View>
                <View style={styles.dobContainer}>
                    {renderLablYear()}
                    <Dropdown
                        style={[styles.dropdown, isFocusYear && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={years}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusYear ? 'Select Year' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => setIsFocusYear(true)}
                        onBlur={() => setIsFocusYear(true)}
                        onChange={item => {
                            setYear(item.value);
                            setIsFocusYear(false);
                        }}
                        onChangeText={yearInputHandler}
                        value={year}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    {renderLablGender()}
                    <Dropdown
                        style={[styles.dropdown, isFocusGender && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={genders}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusGender ? 'Select Gender' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => setIsFocusGender(true)}
                        onBlur={() => setIsFocusGender(true)}
                        onChange={item => {
                            setGender(item.value);
                            setIsFocusGender(false);
                        }}
                        onChangeText={genderInputHandler}
                        value={gender}
                    />
                </View >
                < TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={clearForm} >
                    <Text style={styles.buttonTextStyle}>CLEAR</Text>
                </TouchableOpacity >
                < TouchableOpacity
                    style={styles.buttonStyle1}
                    activeOpacity={0.5}
                    onPress={handleSubmitButton} >
                    <Text style={styles.buttonTextStyle}>REGISTER</Text>
                </TouchableOpacity >
                < TouchableOpacity
                    style={styles.buttonStyle2}
                    activeOpacity={0.5}
                    // onPress={() => { navigation.navigate('Login'); }} >
                    onPress={navToLogin} >
                    <Text style={styles.buttonTextStyle}>CANCEL</Text>
                </TouchableOpacity >
                {/* </KeyboardAvoidingView > */}
            </ScrollView >
        </View >
    );
};

export default RegistrationScreen;

