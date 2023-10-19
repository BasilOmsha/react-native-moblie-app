import {useState} from 'react';

const {View, Text, Image, TouchableOpacity} = require('react-native');

export const ConfirmationPage = ({route}) => {
  const [showGreenCheck, setShowGreenCheck] = useState(false);
  setTimeout(() => {
    setShowGreenCheck(true);
  }, 1000);
  const {email, firstName} = route.params;
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 50,
      }}>
      <View
        style={{
          marginTop: 40,
          marginBottom: 40,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Thank you {firstName} for choosing{' '}
          <Text
            style={{
              color: '#27aae2',
            }}>
            HORIZON
          </Text>
          . Your booking has been confirmed.
        </Text>
      </View>
      <View
        style={{
          marginBottom: 40,
          height: 150,
        }}>
        {showGreenCheck && (
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={require('../../assets/greencheck.png')}
          />
        )}
      </View>
      <View
        style={{
          marginBottom: 40,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
          }}>
          The booking confirmation has been sent to your email address
          <Text
            style={{
              color: '#27aae2',
            }}>
            {' '}
            {email}
          </Text>
          . If you have any questions, contact our customer service
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                color: '#27aae2',
              }}>
              horizon@gmail.com
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View
        style={{
          marginBottom: 40,
        }}>
        <Image
          style={{
            height: 90,
            width: 100,
          }}
          source={require('../../assets/airplain.png')}
        />
      </View>
    </View>
  );
};
