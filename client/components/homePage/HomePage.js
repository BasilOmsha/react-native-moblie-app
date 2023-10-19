import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from 'react-native';
import {fetchLocations} from '../../services/searchServices';
import {airlines, flightDurations24H, stops} from '../../data/data';
import {capitalizeFirstLetter, formatDate} from '../../helper/helper';
import {styles} from '../../styles/globalStyles';
// import CalendarPicker from 'react-native-calendar-picker';
import {ModalScrollView} from '../flatList/modalScrollView';
import {useData} from '../../context/globalData';
import isAuthenticated from '../../src/services/loginServices/IsAuthenticated';
import {useAuthContext} from '../../src/services/loginServices/AuthContext';
import {useSignupFormContext} from '../../src/services/signupServices/SignupLabelsContext';
import {useUserContext} from '../../src/services/UserContext';
import GetUserData from '../../src/services/profileServices/GetUserData';
import CalendarPicker from 'react-native-calendar-picker';
import {validateInputsHome} from './validation';
function HomePage({navigation}) {
  const [from, setFrom] = useState('Copenhagen');
  const [to, setTo] = useState('Helsinki');
  const [date, setDate] = useState(new Date());
  const [round, setRound] = useState(false);
  const [returnDate, setReturnDate] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState('');
  const [selectedStops, setSelectedStops] = useState('');
  const [selectedMaxDuration, setSelectedMaxDuration] = useState('');
  const [isOneWayPressed, setIsOneWayPressed] = useState(false);
  const [isReturnPressed, setIsReturnPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReturnVisible, setModalReturnVisible] = useState(false);
  const [isSelectedAirline, setIsSelectedAirline] = useState('');
  const [isSelectedDuration, setIsSelectedDuration] = useState('');
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const [isStopsModalVisible, setIsStopsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState('');
  const {globalData, addData} = useData();
  const handleOneWay = () => {
    setRound(false);
    setIsOneWayPressed(true);
    setIsReturnPressed(false);
    setReturnDate('');
  };

  /*Added by Basel*/
  // logging the user if they have a valid token and getting there data
  const authContext = useAuthContext();
  const labelContext = useSignupFormContext();
  const userContext = useUserContext();
  async function triggerFunctions() {
    await isAuthenticated(authContext, labelContext);
    await GetUserData(authContext, userContext, labelContext);
  }
  useEffect(() => {
    triggerFunctions();
  }, []);
  /*Added by Basel ends here*/

  const toggleDate = () => {
    setModalVisible(!modalVisible);
  };

  const handleSwitch = () => {
    setFrom(to);
    setTo(from);
  };

  const toggleReturnDate = () => {
    setModalReturnVisible(!modalReturnVisible);
  };

  const handleReturn = () => {
    setRound(true);
    setIsOneWayPressed(false);
    setIsReturnPressed(true);
  };

  const clearData = () => {
    setDate(null);
    setFrom('');
    setTo('');
    setReturnDate(null);
    setSelectedAirline('');
    setIsSelectedDuration('');
    setSelectedStops('');
    setIsOneWayPressed('');
    setIsReturnPressed('');
  };

  const handleAirline = value => {
    setSelectedAirline(value);
    toggleAirlines();
  };

  const toggleAirlines = () => {
    setIsSelectedAirline(!isSelectedAirline);
  };

  const handleDurationToggle = () => {
    setIsDurationModalVisible(!isDurationModalVisible);
  };

  const handleDuration = value => {
    setIsSelectedDuration(value);
    handleDurationToggle();
  };

  const toggleStopsModal = () => {
    setIsStopsModalVisible(!isStopsModalVisible);
  };

  const handleStops = value => {
    setSelectedStops(value);
    toggleStopsModal();
  };

  const fetchData = async () => {
    if (!validateInputsHome(from, to, date)) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }
    try {
      setLoading(true);
      setIsModalLoading(true);

      setTimeout(async () => {
        const response = await fetchLocations(
          from,
          to,
          date,
          round,
          returnDate,
          selectedAirline,
          selectedMaxDuration,
          selectedStops,
        );

        // Update global data using the newData function
        addData({
          combinedFlights: response.data.returnFlights,

          data: response.data.outboundFlights,
        });

        navigation.navigate('Flights', {
          round,
          combinedFlights: response.data.returnFlights,
          data: response.data.outboundFlights,
        });

        setIsModalLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F3F3F3'}}>
      {loading && (
        <View style={styles.circle}>
          <Modal visible={isModalLoading}>
            <Image
              style={{
                height: 800,
                width: 400,
              }}
              source={require('../../assets/loading3.jpg')}
            />
            <Image
              style={{
                height: 80,
                width: 80,
                position: 'relative',
                bottom: 750,
                left: 60,
              }}
              source={require('../../assets/airplain.png')}
            />
            <ActivityIndicator
              size={100}
              style={{position: 'absolute', top: 400, left: 148}}
              color="#5F6A6A"
            />

            <Text
              style={{
                bottom: 350,
                color: '#CCD1D1',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {`Searching flights to ${to} ${formatDate(date)}`}
            </Text>
          </Modal>
        </View>
      )}
      <View style={styles.HomePage}>
        <TouchableOpacity
          onPress={handleOneWay}
          style={[styles.HomeButton, isOneWayPressed && styles.PressedButton]}>
          <Text style={styles.HomePageTabsText}>One-way</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReturn}
          style={[styles.HomeButton, isReturnPressed && styles.PressedButton]}>
          <Text style={styles.HomePageTabsText}>Round-trip</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 30,
          marginBottom: 30,
          marginRight: 10,
          marginLeft: 10,
        }}>
        <TouchableOpacity onPress={toggleAirlines}>
          <Text style={styles.filterHeaderA}>
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={require('../../assets/setting-2.png')}
            />{' '}
            Airlines
          </Text>
        </TouchableOpacity>
        <Modal visible={isSelectedAirline} transparent={true}>
          <ModalScrollView
            data={airlines}
            handleInput={handleAirline}
            toggle={toggleAirlines}
          />
        </Modal>
        <TouchableOpacity onPress={handleDurationToggle}>
          <Text style={styles.filterHeaderD}>
            {' '}
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={require('../../assets/setting-2.png')}
            />{' '}
            Duration
          </Text>
        </TouchableOpacity>
        <Modal visible={isDurationModalVisible} transparent={true}>
          <ModalScrollView
            data={flightDurations24H}
            handleInput={handleDuration}
            toggle={handleDurationToggle}
          />
        </Modal>
        <TouchableOpacity onPress={toggleStopsModal}>
          <Text style={styles.filterHeaderS}>
            {' '}
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={require('../../assets/setting-2.png')}
            />{' '}
            Stops
          </Text>
        </TouchableOpacity>
        <Modal visible={isStopsModalVisible} transparent={true}>
          <ModalScrollView
            data={stops}
            handleInput={handleStops}
            toggle={toggleStopsModal}
          />
        </Modal>
      </View>

      <TextInput
        style={styles.destinationFrom}
        placeholder={` 🛫  From : Please enter city...`}
        value={from}
        onChangeText={text => setFrom(capitalizeFirstLetter(text.trim()))}
      />

      <TextInput
        style={styles.destinationTo}
        placeholder={` 🛬  To : Please enter city...`}
        value={to}
        onChangeText={text => setTo(capitalizeFirstLetter(text.trim()))}
      />
      <TouchableOpacity onPress={handleSwitch}>
        <Text style={styles.switch}>🔄</Text>
      </TouchableOpacity>
      <View style={styles.dateInput}>
        <TouchableOpacity onPress={toggleDate}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={styles.textBold}
              placeholder={`Date ${new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}`}
              value={date}
              editable={false}
            />
            <Text style={{fontSize: 22}}>🗓️</Text>
          </View>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalPage}>
            <CalendarPicker
              minDate={new Date()}
              selectedStartDate={date}
              onDateChange={selectedDate => {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                setDate(formattedDate);
                toggleDate();
              }}
              width={400}
              height={400}
              textStyle={{color: 'black', fontWeight: 'bold'}}
              selectedDayColor="blue"
              selectedDayTextColor="white"
              todayBackgroundColor="lightgray"
              todayTextStyle={{fontWeight: 'bold'}}
            />
            <Button title="cancel" onPress={toggleDate}></Button>
          </View>
        </Modal>

        {round && (
          <TouchableOpacity onPress={toggleReturnDate}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={styles.textBold}
                placeholder={`Return ${new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}`}
                value={returnDate}
                editable={false}
              />
              <Text style={{fontSize: 22}}>🗓️</Text>
            </View>
          </TouchableOpacity>
        )}
        <Modal
          visible={modalReturnVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalPage}>
            <CalendarPicker
              minDate={new Date()}
              selectedStartDate={returnDate}
              onDateChange={selectedDate => {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                setReturnDate(formattedDate);
                toggleReturnDate();
              }}
              width={400}
              height={400}
              textStyle={{color: 'black', fontWeight: 'bold'}}
              selectedDayColor="blue"
              selectedDayTextColor="white"
              todayBackgroundColor="lightgray"
              todayTextStyle={{fontWeight: 'bold'}}
            />
            <Button title="cancel" onPress={toggleReturnDate}></Button>
          </View>
        </Modal>
      </View>
      {from && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
            borderRadius: 8,
          }}>
          <View style={{backgroundColor: 'red', width: 4}}>
            <Text></Text>
          </View>

          <View>
            {from && (
              <Text style={from && styles.filterResults}>From: {from}</Text>
            )}
            {to && <Text style={to && styles.filterResults}>To: {to}</Text>}
            {date && (
              <Text style={date && styles.filterResults}>
                Date: {formatDate(date)}
              </Text>
            )}
            {returnDate && (
              <Text style={returnDate && styles.filterResults}>
                Return: {formatDate(returnDate)}
              </Text>
            )}
            {isOneWayPressed && (
              <Text style={isOneWayPressed && styles.filterResults}>
                Trip: {`One-way`}
              </Text>
            )}
            {isReturnPressed && (
              <Text style={isReturnPressed && styles.filterResults}>
                Trip: {`Round-trip`}
              </Text>
            )}
          </View>
          <View style={{marginRight: 10}}>
            {selectedStops && (
              <Text style={selectedStops && styles.filterResults}>
                Stops: {selectedStops}
              </Text>
            )}
            {isSelectedDuration && (
              <Text style={isSelectedDuration && styles.filterResults}>
                Duration: {isSelectedDuration}
              </Text>
            )}
            {selectedAirline && (
              <Text style={selectedAirline && styles.filterResults}>
                Airlines: {selectedAirline}
              </Text>
            )}
          </View>
        </View>
      )}

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={fetchData}>
          <Text style={styles.buttonsF}>Search flight</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearData}>
          <Text style={styles.buttonsS}>Clear data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomePage;
