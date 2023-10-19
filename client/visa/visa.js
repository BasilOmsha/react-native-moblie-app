import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';

export const VisaPayment = ({route, navigation}) => {
  const {email, firstName, priceOne, priceTwoO, priceTwoR} = route.params;

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable for the activity indicator

  let totalPrice = 0;

  if (priceOne) {
    totalPrice += priceOne;
  }

  if (priceTwoO && priceTwoR) {
    totalPrice += priceTwoO + priceTwoR - priceOne;
  }

  const handlePayment = () => {
    if (!cardHolder || !cardNumber || !expirationDate || !cvc) {
      Alert.alert('Validation Error', 'All fields are required');
    } else {
      // Show the activity indicator
      setIsLoading(true);

      // Simulate a delay using setTimeout
      setTimeout(() => {
        // Hide the activity indicator
        setIsLoading(false);

        // After the delay, navigate to the confirmation page
        navigation.navigate('Confirmation page', {firstName, email});
      }, 2000); // Adjust the timeout duration (in milliseconds) as needed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Hey, {firstName} please fill your visa informations
      </Text>

      <Image
        style={{
          width: 352,
          height: 150,
          justifyContent: 'center',
          marginBottom: 20,
        }}
        source={require('../assets/visa.jpeg')}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Holder Name"
        value={cardHolder}
        onChangeText={text => setCardHolder(text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={text => setCardNumber(text)}
        keyboardType="numeric"
        required
      />
      <View style={styles.inlineInputContainer}>
        <TextInput
          style={styles.inlineInput}
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChangeText={text => setExpirationDate(text)}
          required
        />
        <TextInput
          style={styles.inlineInput}
          placeholder="CVC"
          value={cvc}
          onChangeText={text => setCVC(text)}
          keyboardType="numeric"
          required
        />
      </View>
      <Button title={`Pay total price ${totalPrice}`} onPress={handlePayment} />
      {isLoading && (
        <ActivityIndicator style={{}} size="large" color="#27aae2" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#27aae2',
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  inlineInputContainer: {
    flexDirection: 'row',
  },
  inlineInput: {
    flex: 0.5,
    borderColor: '#27aae2',
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
