import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useUserContext } from '../../services/UserContext';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';

const AppNav = () => {
    const authContext = useAuthContext();

    return (
        <NavigationContainer>
            {authContext.userToken !== null ? <ProfileStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNav;