import React from 'react';
// import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../../components/Register/RegistrationScreen';
import LoginScreen from '../../components/Login/LoginScreen';
import { User } from '../UserContext';
import { Labels } from './SignupLabelsContext';
import styles from '../../styles/SignupStyle';
import SecondRegistration from '../../components/Register/SecondRegistration';
import ThirdRegistration from '../../components/Register/ThirdRegistration';

const Stack = createNativeStackNavigator();

const SignupNav = () => {

  return (
    <User>
      <Labels>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Registration | Basic Info" component={RegistrationScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
            <Stack.Screen name="Registration | Contact & Security" component={SecondRegistration} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
            <Stack.Screen name="Registration | Date of Birth & Other" component={ThirdRegistration} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Labels>
    </User>
  );
};
export default SignupNav;