import React, { useState } from 'react';
import {
    StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useUserContext } from '../../services/UserContext';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import { daysOfMonth, monthsInNumbers, years, genders } from '../../services/signupServices/DateData';
import Loader from '../../services/Loader';
import SuccessModal from '../../services/signupServices/SuccessModal';
import styles from '../../styles/SignupStyle';
import { FormValidation3 } from '../../services/signupServices/FormValidation';

const ThirdRegistration = ({ navigation }) => {
    const userContext = useUserContext();

    const labelContext = useSignupFormContext();

    const clearForm = () => {
        userContext.firstnameInputHandler('');
        userContext.lastnameInputHandler('');
        userContext.emailInputHandler('');
        userContext.passwordInputHandler('');
        userContext.confirmPaswdInputHandler('');
        userContext.dayInputHandler('');
        userContext.monthInputHandler('');
        userContext.yearInputHandler('');
        userContext.genderInputHandler('');

        labelContext.setIsFocusFname(false);
        labelContext.setIsFocusLname(false);
        labelContext.setIsFocusEmail(false);
        labelContext.setIsFocusPaswd(false);
        labelContext.setIsFocusConfPaswd(false);
        labelContext.setIsFocusDay(false);
        labelContext.setIsFocusMonth(false);
        labelContext.setIsFocusYear(false);
        labelContext.setIsFocusGender(false);

        labelContext.setErrortext('');

        labelContext.setErrortext('');
    }
    const handleSubmitButton = async () => {
        labelContext.setErrortext('');
        // Perform form validation
        const validationStatus = await FormValidation3(userContext.userObject, labelContext.setErrortext);

        if (validationStatus === false) {
            labelContext.setLoading(true);
            try {
                let response = await fetch("https://flightbookingserver.lm.r.appspot.com/rest/services/signup",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userContext.userObject)
                    });
                let json = await response.json();
                labelContext.setIsRegistraionSuccess(true);
            }
            catch (error) {
                console.log("The error: " + error);
                labelContext.setLoading(false);
            }
            finally {
                clearForm();
                labelContext.setLoading(false);
            }
        }
    }
    const navToLogin = () => {
        navigation.navigate('Login');
        labelContext.setIsRegistraionSuccess(false);
        clearForm();
    }
    if (labelContext.isRegistraionSuccess) {
        return (
            <SuccessModal navToLogin={navToLogin} />
        );
    }
    return (
        <View style={styles.mainSignupContainer}>
            <Loader loading={labelContext.loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/airplain.png')}
                        style={{
                            width: '50%',
                            height: 80,
                            resizeMode: 'contain',
                            margin: 20,
                        }}
                    />
                </View>
                {/*<KeyboardAvoidingView enabled> */}
                {labelContext.errortext == 'day is empty' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.dobContainer}>
                    {labelContext.renderLablDay()}
                    <Dropdown
                        style={[styles.dropdown, labelContext.isFocusDay && { borderColor: 'blue' }]}
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
                        placeholder={!labelContext.isFocusDay ? 'Select Day' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => labelContext.setIsFocusDay(true)}
                        onBlur={() => labelContext.setIsFocusDay(false)}
                        onChange={item => {
                            userContext.setDay(item.value);
                            labelContext.setIsFocusDay(false);
                        }}
                        onChangeText={userContext.dayInputHandler}
                        value={userContext.day}
                    />
                </View>
                {labelContext.errortext == 'month is empty' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.dobContainer}>
                    {labelContext.renderLablMonth()}
                    <Dropdown
                        style={[styles.dropdown, labelContext.isFocusMonth && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={monthsInNumbers}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!labelContext.isFocusMonth ? 'Select Month' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => labelContext.setIsFocusMonth(true)}
                        onBlur={() => labelContext.setIsFocusMonth(false)}
                        onChange={item => {
                            userContext.setMonth(item.value);
                            labelContext.setIsFocusMonth(false);
                        }}
                        onChangeText={userContext.monthInputHandler}
                        value={userContext.month}
                    />
                </View>
                {labelContext.errortext == 'year is empty' || labelContext.errortext == 'You must be older than 13 to use our service' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.dobContainer}>
                    {labelContext.renderLablYear()}
                    <Dropdown
                        style={[styles.dropdown, labelContext.isFocusYear && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={years}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!labelContext.isFocusYear ? 'Select Year' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => labelContext.setIsFocusYear(true)}
                        onBlur={() => labelContext.setIsFocusYear(false)}
                        onChange={item => {
                            userContext.setYear(item.value);
                            labelContext.setIsFocusYear(false);
                        }}
                        onChangeText={userContext.yearInputHandler}
                        value={userContext.year}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablGender()}
                    <Dropdown
                        style={[styles.dropdown, labelContext.isFocusGender && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={genders}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!labelContext.isFocusGender ? 'Select Gender' : '...'}
                        searchPlaceholder="Search..."
                        onFocus={() => labelContext.setIsFocusGender(true)}
                        onBlur={() => labelContext.setIsFocusGender(false)}
                        onChange={item => {
                            userContext.setGender(item.value);
                            labelContext.setIsFocusGender(false);
                        }}
                        onChangeText={userContext.genderInputHandler}
                        value={userContext.gender}
                    />
                </View >
                {/* <View style={styles.DateSectionContainerStyle}> */}
                < TouchableOpacity
                    style={styles.buttonStyle1}
                    activeOpacity={0.5}
                    onPress={handleSubmitButton} >
                    <Text style={styles.buttonTextStyle}>REGISTER</Text>
                </TouchableOpacity >
                < TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={clearForm} >
                    <Text style={styles.buttonTextStyle}>CLEAR</Text>
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
}
export default ThirdRegistration;