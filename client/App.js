import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './src/components/Register/RegistrationScreen';
import LoginScreen from './src/components/Login/LoginScreen';
import { User } from './src/services/UserContext';
import { Labels } from './src/services/signupServices/SignupLabelsContext';
import styles from './src/styles/Style';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <User>
      <Labels>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: 'white' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Labels>
    </User>
  );
};
export default App;
