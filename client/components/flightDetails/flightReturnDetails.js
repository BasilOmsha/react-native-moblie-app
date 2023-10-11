import React from 'react';
import {FlatList, Text, View, Button} from 'react-native';
import {useData} from '../../context/globalData';
import {formatDate, formatTime} from '../../helper/helper';
import {styles} from '../../styles/globalStyles';

const FlightReturnDetails = ({navigation}) => {
  const {selectedReturnFlight} = useData();
  const selectedData = [
    selectedReturnFlight.outbound,
    selectedReturnFlight.return,
  ]; // Combine outbound and return flights into an array
  console.log('====================================');
  console.log(selectedReturnFlight);
  console.log('====================================');
  return (
    <View>
      <FlatList
        data={selectedData}
        renderItem={({item, index}) => (
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              backgroundColor: 'white',
              borderRadius: 8,
            }}>
            {index === 0 && (
              <Text style={{fontWeight: 'bold', margin: 10}}>
                Outbound Flight <Text style={{fontSize: 20}}>🛫</Text>
              </Text>
            )}
            {index === 1 && (
              <Text style={{fontWeight: 'bold', margin: 10}}>
                Return Flight <Text style={{fontSize: 20}}>🛫</Text>
              </Text>
            )}

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

export default FlightReturnDetails;
