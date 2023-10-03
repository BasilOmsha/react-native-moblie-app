import React from 'react';
// import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../Register/RegistrationScreen';
import LoginScreen from '../Login/LoginScreen';
import styles from '../../styles/SignupStyle';
import SecondRegistration from '../Register/SecondRegistration';
import ThirdRegistration from '../Register/ThirdRegistration';
import ProfileScreen from '../Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Registration | Basic Info" component={RegistrationScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
      <Stack.Screen name="Registration | Contact & Security" component={SecondRegistration} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
      <Stack.Screen name="Registration | Date of Birth & Other" component={ThirdRegistration} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
    </Stack.Navigator>
  );
};
export default AuthStack;