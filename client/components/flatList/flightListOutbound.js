import React from 'react';
import {View, Text, FlatList} from 'react-native';

function FlightListOutbound({data}) {
  return (
    <FlatList
      data={data}
      renderItem={({item: outboundFlights}) =>
        outboundFlights.map((flight, index) => (
          <View key={index} style={{padding: 16}}>
            <Text>From: {flight.from.country}</Text>
            <Text>From airport: {flight.from.airport}</Text>
            <Text>To: {flight.to.country}</Text>
            <Text>To airport: {flight.to.airport}</Text>
            <Text>Departure Time: {flight.departureTime}</Text>
            <Text>Arrival Time: {flight.arrivalTime}</Text>
            <Text>
              Is Direct Flight: {flight.isDirectFlight ? 'Yes' : 'No'}
            </Text>
            <Text>Price: {flight.price}</Text>
            <Text>Airlines: {flight.airline}</Text>
          </View>
        ))
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default FlightListOutbound;
