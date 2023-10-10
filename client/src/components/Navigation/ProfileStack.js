import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native';
import ProfileScreen from '../Profile/ProfileScreen';
import SavedFlights from '../Profile/SavedFlights';
import PurchasedFlights from '../Profile/PurchasedFlights';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from '../Profile/CustomProfileDrawer';

const Drawer = createDrawerNavigator();

const ProfileStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName="Manage your account"
            screenOptions={{
                headerShown: true,
                drawerActiveBackgroundColor: '#27aae2',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
            }}>

            <Drawer.Screen
                name="Manage your account"
                component={ProfileScreen}
                options={{
                    headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: '#fff',
                    headerTitle: 'Edit profile',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Saved"
                component={SavedFlights}
                options={{
                    headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: '#fff',
                    headerTitle: 'Favorites',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="heart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases"
                component={PurchasedFlights}
                options={{
                    headerStyle: { backgroundColor: '#27aae2' }, headerTintColor: '#fff',
                    headerTitle: 'Purchases',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            {/* <Drawer.Screen
                name="Purchases2"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchase3s"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases4"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases5"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases6"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases7"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases8"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Purchases9"
                component={PurchasedFlights}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="basket-outline" size={22} color={color} />
                    ),
                }}
            /> */}
        </Drawer.Navigator>
    );
};

export default ProfileStack;