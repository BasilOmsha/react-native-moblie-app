import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from '../profilePage/UserProfile';
import HomePage from '../homePage/HomePage';
import FlightSearchResults from '../flightSearchResults/flightSearchResults';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="Flights" component={FlightSearchResults} />
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
