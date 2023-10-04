import React from 'react';
import {Button, View} from 'react-native';
import FlightListOutbound from '../flatList/flightListOutbound';
import FlightListReturn from '../flatList/flightListReturn';

const FlightSearchResults = ({route, navigation}) => {
  const {round, combinedFlights, data} = route.params;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {round ? (
        <FlightListReturn data={combinedFlights} round={round} />
      ) : (
        <FlightListOutbound data={data} />
      )}
    </View>
  );
};

export default FlightSearchResults;
