import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {addTravInfoToDatabase} from '../../services/travelerInfo';
import {useData} from '../../context/globalData';
import FlightHeader from '../flightSearchHeader/flightHeaderDate';

export const TicketPurchase = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const {selectedReturnFlight} = useData();
  const {selectedFlightGlobal} = useData();

  const [emailMessage, setEmailMessage] = useState('');

  const addData = async () => {
    try {
      setLoading(true);
      const newFlight = {
        flightNumber: selectedFlightGlobal.flightNumber,
        arrivalCity: selectedFlightGlobal.to.airport,
        departureDate: selectedFlightGlobal.departureTime,
      };

      // Combine the new flight with the existing flights
      const updatedFlights = [...flights, newFlight];
      await addTravInfoToDatabase(
        firstName,
        lastName,
        age,
        gender,
        passportNumber,
        nationality,
        email,
        updatedFlights,
      );
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      // setTimeout to set the email message and hide the ActivityIndicator
      setTimeout(() => {
        setEmailMessage('Please check your email for further instructions'); // Set the email message
        setLoading(false); // Hide the loading indicator
        // setTimeout to clear the email message after 2 seconds
        setTimeout(() => setEmailMessage(''), 2000);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Gender:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={text => setGender(text)}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Passport Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Passport Number"
        value={passportNumber}
        onChangeText={text => setPassportNumber(text)}
      />
      <Text style={styles.label}>Nationality:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Nationality"
        value={nationality}
        onChangeText={text => setNationality(text)}
      />
      <Button title="Purchase Ticket" onPress={addData} />
      <Text style={styles.emailMessage}>{emailMessage}</Text>
      <View style={styles.loading}>
        {loading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
              padding: 30,
              borderRadius: 8,
            }}>
            <Text>
              <ActivityIndicator size="large" />
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Please wait..
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  emailMessage: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  loading: {
    alignItems: 'center',
    bottom: 350,
  },
});
