import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/globalStyles';
import {formatTime} from '../../helper/helper';
import {useData} from '../../context/globalData';

import {useNavigation} from '@react-navigation/native';

function FlightListReturn({data, round}) {
  const {selectedReturnFlight, addReturnFlight} = useData();
  const navigation = useNavigation();

  const handleReturn = newData => {
    addReturnFlight(newData);
  };
  return (
    <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              handleReturn(item);
              navigation.navigate('Round trip details');
            }}>
            <View style={{padding: 16}}>
              {round && item.return ? (
                <View style={styles.outboundContainer}>
                  <View style={styles.bag}>
                    <Text>Bags</Text>
                  </View>
                  <View style={styles.mainView}>
                    <View style={styles.from}>
                      <View>
                        <Text style={styles.Text}>
                          {formatTime(item.outbound.departureTime)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dottedLineContainer}>
                      <View>
                        <Text>{item.outbound.duration}</Text>
                      </View>
                      <View style={styles.dottedLine}>
                        {item.outbound.isDirectFlight ? (
                          <View></View>
                        ) : (
                          <View style={styles.twoRedDots}>
                            <View style={styles.blueDotR}></View>
                          </View>
                        )}
                      </View>
                      <Text style={styles.stopAir}>
                        {item.outbound.isDirectFlight
                          ? 'Direct'
                          : `One stop: ${item.outbound.stopoverCountry}`}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#27aae2',
                          right: 18,
                          top: 15,
                        }}>
                        ➢
                      </Text>
                    </View>
                    <View style={styles.to}>
                      <View>
                        <Text style={styles.Text}>
                          {formatTime(item.outbound.arrivalTime)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.price}>
                        <Text style={styles.priceText}>
                          {item.outbound.price} €
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{marginTop: 20}}></View>

                  <View style={styles.mainView}>
                    <View style={styles.from}>
                      <View>
                        <Text style={styles.Text}>
                          {formatTime(item.return.departureTime)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#27aae2',
                          left: 17,
                          top: 17,
                          transform: [{rotate: '180deg'}],
                        }}>
                        ➢
                      </Text>
                    </View>
                    <View style={styles.dottedLineContainer}>
                      <View>
                        <Text>{item.return.duration}</Text>
                      </View>
                      <View style={styles.dottedLine}>
                        {item.return.isDirectFlight ? (
                          <View></View>
                        ) : (
                          <View style={styles.twoRedDots}>
                            <View style={styles.blueDotB}></View>
                          </View>
                        )}
                      </View>
                      <Text style={styles.stopAir}>
                        {item.return.isDirectFlight
                          ? 'Direct'
                          : `One stop: ${item.return.stopoverCountry}`}
                      </Text>
                    </View>

                    <View style={styles.to}>
                      <View>
                        <Text style={styles.Text}>
                          {formatTime(item.return.arrivalTime)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.price}>
                        <Text style={styles.priceText}>
                          {item.return.price} €
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.airline}>
                    <Text style={styles.airlineb}>
                      {item.return.airline} / {item.outbound.airline}
                    </Text>
                    <Text style={styles.airlineb}>
                      {item.return.from.airport} / {item.outbound.from.airport}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default FlightListReturn;
