import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {useData} from '../../context/globalData';
import {formatDate, formatTime} from '../../helper/helper';
import {styles} from '../../styles/globalStyles';

const FlightDetails = ({navigation}) => {
  const {selectedFlightGlobal, setSelectedFlightGlobal} = useData();
  const selectedData = [selectedFlightGlobal];
  console.log('====================================');
  console.log(selectedFlightGlobal);
  console.log('====================================');
  const tryout = [
    {
      airline: 'Austrian Airlines',
      arrivalTime: '2023-10-11T02:38:00.929Z',
      departureTime: '2023-10-10T22:38:00.929Z',
      duration: '4h 0m',
      capitalCity: 'Finland',
      capitalCity: 'Denmark',
      isDirectFlight: 'No',
      stopoverCountry: 'Finland',

      from: {
        country: 'Helsinki',
        airport: 'Helsinki-Vantaa Airport',
        capitalCity: 'Finland',
      },
      to: {
        country: 'Prague',
        airport: 'Prague Václav Havel Airport',
        capitalCity: 'Czech Republic',
      },
      departureTime: '2023-12-12T08:57:25.208Z',
      price: 714,
    },
  ];

  return (
    <View>
      <FlatList
        data={selectedData}
        renderItem={({item}) => (
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              backgroundColor: 'white',
              borderRadius: 8,
            }}>
            <View>
              <View>
                <Text style={styles.flightDetailsInfo}>
                  {formatTime(item.departureTime)}
                </Text>
              </View>

              <View style={styles.dottedLineContainerD}>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    From: {item.from.capitalCity}
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Airport: {item.from.airport}
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Date: {formatDate(item.departureTime)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Duration: {item.duration}
                  </Text>
                </View>
                <View style={styles.dottedLineDetailsD}>
                  {item.isDirectFlight ? (
                    <View></View>
                  ) : (
                    <View style={styles.twoRedDots}>
                      <View style={styles.bluedotInfo}></View>
                    </View>
                  )}
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Stops:{' '}
                    {item.isDirectFlight
                      ? 'Direct'
                      : `One stop: ${item.stopoverCountry}`}
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Airlines: {item.airline}
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Price: {item.price} €
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    To: {item.to.capitalCity}
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightDetailsInfo}>
                    Airport: {item.to.airport}
                  </Text>
                </View>
              </View>
              <Text style={{fontSize: 20, left: 18}}>🔰</Text>
              <Text style={styles.flightDetailsInfo}>
                {formatTime(item.arrivalTime)}
              </Text>

              <View></View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FlightDetails;
