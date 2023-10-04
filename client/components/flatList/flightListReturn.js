import React from 'react';
import {View, Text, FlatList} from 'react-native';

function FlightListReturn({data, round}) {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <View style={{padding: 16}}>
            {/* Check if it's a two-way flight */}
            {round && item.return ? (
              // Display information for two-way flight
              <>
                <Text>From: {item.outbound.from.country}</Text>
                <Text>From airport: {item.outbound.from.airport}</Text>
                <Text>To: {item.outbound.to.country}</Text>
                <Text>To airport: {item.outbound.to.airport}</Text>
                <Text>Departure Time: {item.outbound.departureTime}</Text>
                <Text>Arrival Time: {item.outbound.arrivalTime}</Text>
                <Text>
                  Is Direct Flight:{' '}
                  {item.outbound.isDirectFlight ? 'Yes' : 'No'}
                </Text>
                <Text>Price: {item.outbound.price}</Text>
                <Text>Airlines: {item.outbound.airline}</Text>
                <Text>Return - From: {item.return.from.country}</Text>
                <Text>Return - From airport: {item.return.from.airport}</Text>
                <Text>Return - To: {item.return.to.country}</Text>
                <Text>Return - To airport: {item.return.to.airport}</Text>
                <Text>
                  Return - Departure Time: {item.return.departureTime}
                </Text>
                <Text>Return - Arrival Time: {item.return.arrivalTime}</Text>
                <Text>
                  Return - Is Direct Flight:{' '}
                  {item.return.isDirectFlight ? 'Yes' : 'No'}
                </Text>
                <Text>Return - Price: {item.return.price}</Text>
                <Text>Return - Airlines: {item.return.airline}</Text>
              </>
            ) : null}
          </View>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default FlightListReturn;
