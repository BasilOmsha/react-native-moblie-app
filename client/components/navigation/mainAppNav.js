import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from '../profilePage/UserProfile';
import HomePage from '../homePage/HomePage';
import FlightSearchResults from '../flightSearchResults/flightSearchResults';
import FlightDetails from '../flightDetails/flightOutboundDetails';
import FlightHeader from '../flightSearchHeader/flightHeaderDate';
import FlightReturnDetails from '../flightDetails/flightReturnDetails';
import {TicketPurchase} from '../ticketPurchase/ticketPurchase';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#27aae2', // Set your desired background color
      },
    }}>
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen
      name="Flights"
      options={{
        headerRight: () => <FlightHeader />,
      }}
      component={FlightSearchResults}
    />
    <Stack.Screen name="One-way details" component={FlightDetails} />
    <Stack.Screen name="Round trip details" component={FlightReturnDetails} />
    <Stack.Screen name="Traveler info" component={TicketPurchase} />
  </Stack.Navigator>
);

const NavButton = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={HomeStackScreen}
          options={{
            headerShown: false, // Hide the header (including the title)
          }}
        />
        <Tab.Screen name="Profile" component={UserProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavButton;
