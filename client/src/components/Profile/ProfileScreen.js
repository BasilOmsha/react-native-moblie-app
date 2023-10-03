import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, } from 'react-native';
import Loader from '../../services/Loader';
import styles from '../../styles/SignupStyle';
import { useUserContext } from '../../services/UserContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import IsNotAuthenticated from '../../services/loginServices/IsNotAuthenticated';
const ProfileScreen = () => {
    const userContext = useUserContext();
    const labelContext = useSignupFormContext();
    const authContext = useAuthContext();

    const [loggedEmail, setLoggedEmail] = useState('');

    const getUsername = async () => {
        let userInfo = await EncryptedStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        if (userInfo) {
            setLoggedEmail(userInfo.user);
        }
    }
    getUsername();
    
    useEffect(() => {
        const checkAuthentication = async () => {
            await IsNotAuthenticated(labelContext, authContext); // Use the imported function
        };

        checkAuthentication();
    }, []);

    const handleLogout = () => {
        labelContext.setLoading(true);
        authContext.logout();
    }

    return (
        <View>
            {labelContext.loading == true ? <Loader loading={userContext.loading} /> : labelContext.loading == false}
            <Text>Hello {loggedEmail} </Text>
            < TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={handleLogout} >
                <Text style={styles.buttonTextStyle}>Sign Out</Text>
            </TouchableOpacity >
        </View>
    )
}

export default ProfileScreen;