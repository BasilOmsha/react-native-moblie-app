import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { formatTime } from '../../helper/helper';
import { styles } from '../../styles/globalStyles';
import { useData } from '../../context/globalData';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../src/services/UserContext';
import { useAuthContext } from '../../src/services/loginServices/AuthContext';
import { useSignupFormContext } from '../../src/services/signupServices/SignupLabelsContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddUsrFavFlights from '../../src/services/profileServices/AddUsrFavFlights';

function FlightListOutbound({ data }) {
  const navigation = useNavigation();

  //Global variable
  const { selectedFlightGlobal, addSelectedData } = useData();

  const handleFlightSelection = flightData => {
    addSelectedData(flightData);
    navigation.navigate('One-way details');
  };

  /*Added by Basel*/
  // Add flights to looged user favorites
  const authContext = useAuthContext();
  const labelContext = useSignupFormContext();
  const userContext = useUserContext();
  
  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };
  const addToFav = async (selectedFlightGlobal) => {
    if (!authContext.userToken) {
      Alert.alert('        You need to be logged in!', '', [], { cancelable: true, });
    }
    if (authContext.userToken) {
      console.log("selectedFlight: " + selectedFlightGlobal.airline);
      console.log("selectedFlight: " + selectedFlightGlobal.from.country);
      await AddUsrFavFlights(authContext, labelContext, userContext, selectedFlightGlobal);
    }
  }
  /*Added by Basel ends here*/

  return (
    <FlatList
      data={data}
      renderItem={({ item: outboundFlights }) =>
        outboundFlights.map((flight, index) => (
          <TouchableOpacity
            onPress={() => handleFlightSelection(flight)} // Pass the flight data to the handler
            key={index}>
            <View style={styles.outboundContainer} key={index}>
              <View style={styles.bag}>
                <Text>bag</Text>
              </View>
              <View style={styles.mainView}>
                <View style={styles.from}>
                  <View>
                    <Text style={styles.Text}>
                      {formatTime(flight.departureTime)}
                    </Text>
                  </View>
                  <View>
                    <Text>{flight.from.country}</Text>
                  </View>
                </View>
                <View style={styles.dottedLineContainer}>
                  <View>
                    <Text>{flight.duration}</Text>
                  </View>
                  <View style={styles.dottedLine}>
                    {flight.isDirectFlight ? (
                      <View></View>
                    ) : (
                      <View style={styles.twoRedDots}>
                        <View style={styles.blueDot}></View>
                      </View>
                    )}
                  </View>
                  <Text style={styles.stopAir}>
                    {flight.isDirectFlight
                      ? 'Direct'
                      : `One stop: ${flight.stopoverCountry}`}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#27aae2',
                      right: 20,
                      top: 15,
                    }}>
                    ➢
                  </Text>
                </View>
                <View style={styles.to}>
                  <View>
                    <Text style={styles.Text}>
                      {formatTime(flight.arrivalTime)}
                    </Text>
                  </View>
                  <View>
                    <Text>{flight.to.country}</Text>
                  </View>
                </View>
                <View>
                  <View style={styles.price}>
                    <Text style={styles.priceText}>{flight.price} € </Text>
                  </View>
                </View>
              </View>
              <View style={styles.airline}>
                <Text style={styles.airlineb}>{flight.airline}</Text>
                <View style={styles.favbutton}>
                  <Text style={styles.airlineb}>{flight.from.airport}</Text>
                  {/*Added by Basel*/}
                  {/* Add flights to looged user favorites */}
                  <TouchableOpacity onPress={() => {
                    userContext.setLoadingItem(prevLoadingItem => [...prevLoadingItem, flight.price]); // Add index to loadingItem state list
                    console.log("index " + flight.price);
                    addToFav(flight);
                    }}>
                  { userContext.loadingItem.includes(flight.price) ?
                  // {isLoading && index === lodaingItem ?
                    <Ionicons name="heart-sharp" size={15} color="#000" />
                    :
                    <Ionicons name="heart-outline" size={15} color="#000" />
                  }
                  </TouchableOpacity>
                  {/*Added by Basel ends here*/}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default FlightListOutbound;
