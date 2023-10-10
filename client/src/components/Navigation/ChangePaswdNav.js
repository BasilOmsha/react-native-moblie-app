import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../Profile/ProfileScreen';
import PaswdScreen from '../Profile/CangePaswdScreen';
import ProfileStack from './ProfileStack';

const Stack = createNativeStackNavigator();

const ChangePaswdNav = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Change password" component={PaswdScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: '#fff', headerShadowVisible: true }} />
            <Stack.Screen name="ProfileStack" component={ProfileStack} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: '#cfebf3', headerShadowVisible: false }} />
        </Stack.Navigator>

    );
};
export default ChangePaswdNav;