import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import { User } from './src/components/UserContext';
import { Labels } from './src/components/signupComponents/SignupLabelsContext';
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
