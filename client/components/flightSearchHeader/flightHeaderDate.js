import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useData} from '../../context/globalData';
import {formatDate} from '../../helper/helper';

const FlightHeader = () => {
  const {globalData} = useData();

  // Access and use globalData
  const outboundFlights = globalData[0].data.flat() || []; // Flatten the nested arrays

  //  new array containing only the first item from outboundFlights
  const firstFlight = outboundFlights.length > 0 ? [outboundFlights[0]] : [];

  return (
    <View style={{top: 12, right: 14}}>
      <FlatList
        data={firstFlight}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.from.country} <Text> ➤ </Text>
              {item.to.country}
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {formatDate(item.departureTime)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default FlightHeader;
