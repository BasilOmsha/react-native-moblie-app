import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, } from 'react-native';
import { useUserContext } from '../../services/UserContext';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import LoginService from '../../services/loginServices/LoginService';
import isAuthenticated from '../../services/loginServices/IsAuthenticated';
import Loader from '../../services/Loader';
import styles from '../../styles/LoginStyle';

const LoginScreen = ({ navigation }) => {
    const userContext = useUserContext();
    const authContext = useAuthContext();
    const labelContext = useSignupFormContext();

    const handleLogin = async () => {
        await LoginService(userContext, authContext, labelContext);
    };

    useEffect(() => {
        isAuthenticated(authContext, labelContext);
    }, []);

    return (
        <View style={styles.mainLoginContainer}>
            {labelContext.loading == true ?
                <Loader loading={userContext.loading} /> : labelContext.loading == false}
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
                {labelContext.errortext ? <Text style={{ color: 'red', fontSize: 15, textAlign: 'left', marginLeft: 40, marginLeft: 40, marginBottom: -10, marginTop: 10 }}>{labelContext.errortext}</Text> : null}
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablEmail()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusEmail && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        placeholder={!labelContext.isFocusEmail ? 'Email' : 'Email'}
                        placeholderTextColor="#777777"
                        onFocus={async () => {
                            labelContext.setIsFocusEmail(true)
                        }}
                        onBlur={async () => { labelContext.setIsFocusEmail(false) }}
                        onChange={async (item) => {
                            // setValue(item.value);
                            labelContext.setIsFocusEmail(true);
                        }}
                        onChangeText={userContext.emailInputHandler}
                        value={userContext.email}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    {labelContext.renderLablPaswd()}
                    <TextInput
                        style={[styles.inputStyle, labelContext.isFocusPaswd && { borderColor: 'blue' }]}
                        underlineColorAndroid="#f000"
                        secureTextEntry={true}
                        placeholder={!labelContext.isFocusPaswd ? 'Password' : 'Password'}
                        placeholderTextColor="#777777"
                        onFocus={async () => {
                            labelContext.setIsFocusPaswd(true)
                        }}
                        onBlur={async () => { labelContext.setIsFocusPaswd(false) }}
                        onChange={async (item) => {
                            // setValue(item.value);
                            labelContext.setIsFocusPaswd(true);
                        }}
                        onChangeText={userContext.passwordInputHandler}
                        value={userContext.password}
                    />
                </View>
                < TouchableOpacity
                    style={styles.loginButton}
                    activeOpacity={0.5}
                    onPress={handleLogin}
                    // onPress={()=>LoginService(userContext, authContext, labelContext)}
                >
                    <Text style={styles.loginbuttonTextStyle}>Login</Text>
                </TouchableOpacity >
                <View style={styles.signupLinkContainer}>
                    <Text style={styles.TextStyle}> Don't Have an account?</Text>
                    < TouchableOpacity
                        style={styles.signuplink}
                        onPress={() => {
                            navigation.navigate('Registration | Basic Info');
                        }} >
                        <Text style={styles.signupLinkTextStyle}>   Register</Text>
                    </TouchableOpacity >
                </View>
            </ScrollView >
        </View>
    )
}

export default LoginScreen;