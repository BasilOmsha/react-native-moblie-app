import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useUserContext } from '../../services/UserContext';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import changePaswdNav from './ChangePaswdNav';

const Stack = createNativeStackNavigator();

const ProtectedStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={changePaswdNav} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

const AppNav = () => {
    const authContext = useAuthContext();

    return (
        <NavigationContainer>
            {authContext.userToken !== null ? <ProtectedStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNav;