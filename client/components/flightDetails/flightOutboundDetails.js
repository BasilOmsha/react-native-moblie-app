import React from 'react';
import {FlatList, Text, View, StyleSheet, Button} from 'react-native';
import {useData} from '../../context/globalData';
import {formatDate, formatTime} from '../../helper/helper';
import {styles} from '../../styles/globalStyles';

const FlightDetails = ({navigation}) => {
  const {selectedFlightGlobal, setSelectedFlightGlobal} = useData();
  const selectedData = [selectedFlightGlobal];
  console.log('====================================');
  console.log(selectedFlightGlobal);
  console.log('====================================');

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
              <Button
                title="Buy"
                onPress={() => {
                  navigation.navigate('Traveler info');
                }}></Button>

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
