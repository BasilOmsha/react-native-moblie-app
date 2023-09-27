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
import { FormValidation, FormValidation2 } from '../../services/signupServices/FormValidation';

const SecondRegistration = ({ navigation }) => {
    const userContext = useUserContext();

    const labelContext = useSignupFormContext();

    const clearForm = () => {
        userContext.emailInputHandler('');
        userContext.passwordInputHandler('');
        userContext.confirmPaswdInputHandler('');

        labelContext.setIsFocusEmail(false);
        labelContext.setIsFocusPaswd(false);
        labelContext.setIsFocusConfPaswd(false);

        labelContext.setErrortext('');
    }

    const navToLogin = () => {
        navigation.navigate('Login');
        labelContext.setIsRegistraionSuccess(false);
        clearForm();
    }

    const nxtbutton = async () => {
        const validationStatus = await FormValidation2(userContext.userObject, labelContext.setErrortext);
        if (validationStatus === false) {
            navigation.navigate('Registration | Date of Birth & Other');
        }
        // navigation.navigate('Registration3');
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
                {/*<KeyboardAvoidingView enabled> */}
                {labelContext.errortext == 'Email is already in use' || labelContext.errortext == 'Invalid email format' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablEmail()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusEmail && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!labelContext.isFocusEmail ? 'Email' : 'Email'}
                        placeholderTextColor="#777777"
                        onFocus={() => labelContext.setIsFocusEmail(true)}
                        onBlur={() => labelContext.setIsFocusEmail(false)}
                        onChangeText={userContext.emailInputHandler}
                        value={userContext.email}
                    />
                   
                </View>
                {labelContext.errortext == 'Password field is empty' || labelContext.errortext == 'Password must be at least 8 characters, contain numbers, lowercase, uppercase, and symbols.' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablPaswd()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusPaswd && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        secureTextEntry={true}
                        placeholder={!labelContext.isFocusPaswd ? 'Password' : 'Password'}
                        placeholderTextColor="#777777"
                        onFocus={() => labelContext.setIsFocusPaswd(true)}
                        onBlur={() => labelContext.setIsFocusPaswd(false)}
                        onChangeText={userContext.passwordInputHandler}
                        value={userContext.password}
                    />
                </View>
                {labelContext.errortext == 'Passowrds do not match' || labelContext.errortext == 'Confirmed password field is empty' ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft:40, marginBottom:-10, marginTop:10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablConfPaswd()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusConfPaswd && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        secureTextEntry={true}
                        placeholder={!labelContext.isFocusConfPaswd ? 'Confirm Password' : 'Confirm Password'}
                        placeholderTextColor="#777777"
                        onFocus={() => labelContext.setIsFocusConfPaswd(true)}
                        onBlur={() => labelContext.setIsFocusConfPaswd(false)}
                        onChangeText={userContext.confirmPaswdInputHandler}
                        value={userContext.paswdConfirm}
                    />
                </View>
                {/* <View style={styles.DateSectionContainerStyle}> */}
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
}
export default SecondRegistration;