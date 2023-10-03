import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native';
import ProfileScreen from '../Profile/ProfileScreen';
import ShowInfo from '../Profile/InfoScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#aa18ea',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    // marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
            }}>

            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
            // options={{
            //     drawerIcon: ({ color }) => (
            //         <Ionicons name="person-outline" size={22} color={color} />
            //     ),
            // }}
            />
            <Drawer.Screen
                name="Show Info"
                component={ShowInfo}
            // options={{
            //     drawerIcon: ({ color }) => (
            //         <Ionicons name="person-outline" size={22} color={color} />
            //     ),
            // }}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;