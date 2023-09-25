import React, { useState } from 'react';
import {
    StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView,
} from 'react-native';
import { useUserContext } from '../components/UserContext';
import { useSignupFormContext } from '../components/signupComponents/SignupLabelsContext';
import Loader from '../components/Loader';
import styles from '../styles/Style';

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Hellow World!</Text>
            < TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => {
                    // change to login screeb
                    navigation.navigate('Registration');
                }} >
                <Text style={styles.buttonTextStyle}>Register</Text>
            </TouchableOpacity >
        </View>
    )
}

export default LoginScreen;