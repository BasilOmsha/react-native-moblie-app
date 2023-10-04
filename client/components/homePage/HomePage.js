import React, {useState, useEffect} from 'react';
import {Button, View, TextInput, ActivityIndicator, Text} from 'react-native';
import {fetchLocations} from '../../services/searchServices';

function HomePage({navigation}) {
  const [from, setFrom] = useState('Denmark');
  const [to, setTo] = useState('Spain');
  const [date, setDate] = useState('2023-11-11');
  const [round, setRound] = useState(false);
  const [returnDate, setReturnDate] = useState('2023-02-01');
  const [loading, setLoading] = useState(false);

  const handleOneWay = () => {
    setRound(false);
  };

  const handleReturn = () => {
    setRound(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading indicator

      setTimeout(async () => {
        const response = await fetchLocations(
          from,
          to,
          date,
          round,
          returnDate,
        );

        // Navigate to the Flights screen after 4 seconds
        navigation.navigate('Flights', {
          round,
          combinedFlights: response.data.returnFlights,
          data: response.data.outboundFlights,
        });

        setLoading(false); // Stop loading indicator
      }, 4000); // 4 seconds delay
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false); // Stop loading indicator in case of an error
    }
  };

  return (
    <View style={{flex: 1}}>
      <Button title="One-way" onPress={handleOneWay} />
      <Button title="Return" onPress={handleReturn} />
      <TextInput
        placeholder="From"
        value={from}
        onChangeText={text => setFrom(text)}
      />
      <TextInput
        placeholder="To"
        value={to}
        onChangeText={text => setTo(text)}
      />
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={text => setDate(text)}
      />
      {round && (
        <TextInput
          placeholder="Return Date"
          value={returnDate}
          onChangeText={text => setReturnDate(text)}
        />
      )}
      <Button title="Search flight" onPress={fetchData} />
      {loading && (
        <ActivityIndicator
          size="large"
          style={{marginTop: 20}}></ActivityIndicator>
      )}
    </View>
  );
}

export default HomePage;
