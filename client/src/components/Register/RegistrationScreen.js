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
import { FormValidation1 } from '../../services/signupServices/FormValidation';

const RegistrationScreen = ({ navigation }) => {

    const userContext = useUserContext();

    const labelContext = useSignupFormContext();

    const clearForm = () => {
        userContext.firstnameInputHandler('');
        userContext.lastnameInputHandler('');

        labelContext.setIsFocusFname(false);
        labelContext.setIsFocusLname(false);

        labelContext.setErrortext('');
    }

    const navToLogin = () => {
        navigation.navigate('Login');
        labelContext.setIsRegistraionSuccess(false);
        clearForm();
    }

    const nxtbutton = async () => {
        const validationStatus = await FormValidation1(userContext.userObject, labelContext.setErrortext);
        if (validationStatus === false) {
            navigation.navigate('Registration | Contact & Security');
        }
        // labelContext.setIsRegistraionSuccess(false);
        // clearForm();
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
                {labelContext.errortext == 'Firstname cannot be empty' || labelContext.errortext == 'The first name is too short' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablFName()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusFname && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!labelContext.isFocusFname ? 'First Name' : 'First Name'}
                        placeholderTextColor="#777777"
                        onFocus={async () => {
                            labelContext.setIsFocusFname(true)
                        }}
                        onBlur={async () => { labelContext.setIsFocusFname(false) }}
                        onChange={async (item) => {
                            // setValue(item.value);
                            labelContext.setIsFocusFname(true);
                        }}
                        onChangeText={userContext.firstnameInputHandler}
                        value={userContext.firstname}
                    />
                </View>
                {labelContext.errortext == 'The last name is too short' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablLName()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusLname && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!labelContext.isFocusFname ? 'Last Name' : 'Last Name'}
                        placeholderTextColor="#777777"
                        onFocus={async () => labelContext.setIsFocusLname(true)}
                        onBlur={async () => labelContext.setIsFocusLname(false)}
                        onChange={async (item) => {
                            // setValue(item.value);
                            labelContext.setIsFocusLname(true);
                        }}
                        onChangeText={userContext.lastnameInputHandler}
                        value={userContext.lastname}
                    />
                </View>
                < TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={nxtbutton} >
                    <Text style={styles.buttonTextStyle}>NEXT</Text>
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
};

export default RegistrationScreen;

