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
import AuthStack from '../../src/components/Navigation/AuthStack';
import ProfileStack from '../../src/components/Navigation/ProfileStack';
import changePaswdNav from '../../src/components/Navigation/ChangePaswdNav';
import {useAuthContext} from '../../src/services/loginServices/AuthContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Stack2 = createNativeStackNavigator();

const ProtectedStack = () => {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="User"
        component={ProfileStack}
        options={{headerShown: false}}
      />
      <Stack2.Screen
        name="ChangePassword"
        component={changePaswdNav}
        options={{headerShown: false}}
      />
    </Stack2.Navigator>
  );
};

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
  const authContext = useAuthContext();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={HomeStackScreen}
          options={{
            headerShown: false, // Hide the header (including the title)
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={
            authContext.userToken !== null ? ProtectedStack : AuthStack
          }
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavButton;
