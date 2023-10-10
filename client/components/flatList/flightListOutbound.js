import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {formatTime} from '../../helper/helper';
import {styles} from '../../styles/globalStyles';
import {useData} from '../../context/globalData';
import {useNavigation} from '@react-navigation/native';

function FlightListOutbound({data}) {
  const navigation = useNavigation();
  //Global variable
  const {selectedFlightGlobal, addSelectedData} = useData();
  const handleFlightSelection = flightData => {
    addSelectedData(flightData);
    navigation.navigate('FlightDetails');
  };
  return (
    <FlatList
      data={data}
      renderItem={({item: outboundFlights}) =>
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
                      right:20,
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
                <Text style={styles.airlineb}>{flight.from.airport}</Text>
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
