import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {addTravInfoToDatabase} from '../../services/travelerInfo';
import {useData} from '../../context/globalData';
import {validateInputs} from './inputValidation';
export const TicketPurchase = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {selectedReturnFlight} = useData();
  const {selectedFlightGlobal} = useData();

  const selectedData = [
    selectedReturnFlight.outbound,
    selectedReturnFlight.return,
  ];
  const priceOne = selectedFlightGlobal.price;
  const priceTwoO = selectedData[0]?.price;
  const priceTwoR = selectedData[1]?.price;

  const addData = async () => {
    if (
      !validateInputs(
        firstName,
        lastName,
        age,
        gender,
        passportNumber,
        nationality,
        email,
      )
    ) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    try {
      setLoading(true);

      let updatedFlights = [];
      if (selectedFlightGlobal) {
        const newFlight = {
          arrivalCity: selectedFlightGlobal.arrivalCity || '',
          departureCity: selectedFlightGlobal.departureCity || '',
          departureDate: selectedFlightGlobal.departureDate || '',
          price: selectedFlightGlobal.price || '',
          from: {
            country: selectedFlightGlobal.from?.country || '',
            airport: selectedFlightGlobal.from?.airport || '',
            capitalCity: selectedFlightGlobal.from?.capitalCity || '',
          },
          to: {
            country: selectedFlightGlobal.to?.country || '',
            airport: selectedFlightGlobal.to?.airport || '',
            capitalCity: selectedFlightGlobal.to?.capitalCity || '',
          },
          departureTime: selectedFlightGlobal.departureTime || '',
          arrivalTime: selectedFlightGlobal.arrivalTime || '',
          isDirectFlight: selectedFlightGlobal.isDirectFlight ? true : false,
          stopoverCountry: selectedFlightGlobal.stopoverCountry || '',
          airline: selectedFlightGlobal.airline || '',
          duration: selectedFlightGlobal.duration || '',
        };

        updatedFlights.push(newFlight);
      }

      if (selectedReturnFlight) {
        const newFlight2 = {
          arrivalCity: selectedData[0]?.arrivalCity || '',
          departureCity: selectedData[0]?.departureCity || '',
          departureDate: selectedData[0]?.departureDate || '',
          price: selectedData[0]?.price || '',
          from: {
            country: selectedData[0]?.from.country || '',
            airport: selectedData[0]?.from.airport || '',
            capitalCity: selectedData[0]?.from.capitalCity || '',
          },
          to: {
            country: selectedData[0]?.to.country || '',
            airport: selectedData[0]?.to.airport || '',
            capitalCity: selectedData[0]?.to.capitalCity || '',
          },
          departureTime: selectedData[0]?.departureTime || '',
          arrivalTime: selectedData[0]?.arrivalTime || '',
          isDirectFlight: selectedData[0]?.isDirectFlight ? true : false,
          stopoverCountry: selectedData[0]?.stopoverCountry || '',
          airline: selectedData[0]?.airline || '',
          duration: selectedData[0]?.duration || '',
        };

        const newFlight3 = {
          arrivalCity: selectedData[1]?.arrivalCity || '',
          departureCity: selectedData[1]?.departureCity || '',
          departureDate: selectedData[1]?.departureDate || '',
          price: selectedData[1]?.price || '',
          from: {
            country: selectedData[1]?.from.country || '',
            airport: selectedData[1]?.from.airport || '',
            capitalCity: selectedData[1]?.from.capitalCity || '',
          },
          to: {
            country: selectedData[1]?.to.country || '',
            airport: selectedData[1]?.to.airport || '',
            capitalCity: selectedData[1]?.to.capitalCity || '',
          },
          departureTime: selectedData[1]?.departureTime || '',
          arrivalTime: selectedData[1]?.arrivalTime || '',
          isDirectFlight: selectedData[1]?.isDirectFlight ? true : false,
          stopoverCountry: selectedData[1]?.stopoverCountry || '',
          airline: selectedData[1]?.airline || '',
          duration: selectedData[1]?.duration || '',
        };

        updatedFlights.push(newFlight2, newFlight3);
      }

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
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Visa Payment', {
          email,
          firstName,
          priceOne,
          priceTwoO,
          priceTwoR,
        });
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <Text style={styles.label}>Last Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <Text style={styles.label}>Age *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Gender *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={text => setGender(text)}
      />
      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Passport Number *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Passport Number"
        value={passportNumber}
        onChangeText={text => setPassportNumber(text)}
      />
      <Text style={styles.label}>Nationality *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Nationality"
        value={nationality}
        onChangeText={text => setNationality(text)}
      />
      <Button title="Purchase Ticket" onPress={addData} />
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
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#27aae2',
    borderWidth: 0.5,
    marginBottom: 12,
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
