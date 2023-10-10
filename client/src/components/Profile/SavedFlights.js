import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useUserContext } from '../../services/UserContext';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import IsNotAuthenticated from '../../services/loginServices/IsNotAuthenticated';
import GetUsrFavFlights from '../../services/profileServices/GetUsrFavFlights';
import Loader from '../../services/Loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/FavScreenStyle';

const formatTime = (utcTimestamp) => {
  if (utcTimestamp) {
    const date = new Date(utcTimestamp);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return '';
};

// Helper function to convert airport names to shorter format
const shortenAirportName = (airportName) => {
  const words = airportName.split(' ');
  if (words.length > 2) {
    // If airport name has more than 2 words, use the first letter of each word
    return words.map((word) => word[0]).join('').toUpperCase();
  } else {
    // If airport name has 2 or fewer words, use the first 3 letters of the first word
    return words[0].substring(0, 3).toUpperCase();
  }
};

const SavedFlights = () => {

  const userContext = useUserContext();
  const labelContext = useSignupFormContext();
  const authContext = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);

  let row = [];
  let prevOpenedRow;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    labelContext.setErrortext(null);
    triggerFunctions();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  async function triggerFunctions() {
    await IsNotAuthenticated(labelContext, authContext);
    await GetUsrFavFlights(authContext, userContext, labelContext);
  }

  useEffect(() => {
    triggerFunctions();
    onRefresh();
  }, []);



  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }

  const renderFavFlights = ({ item, index }, onDelete) => {

    const renderRightView = (onDeleteHandler) => {
      return (
        <View style={styles.SwipeContainer}>
          <TouchableOpacity
          style={styles.DeleteButton}
            onPress={e => {
              onDeleteHandler(e)
            }}
          >
            <Text style={styles.DeleteTextButton}>
              DELETE
            </Text>
          </TouchableOpacity>
          {/* <Button color="red" onPress={e => {
            onDeleteHandler(e)
          }} title="DELETE"></Button> */}
        </View>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightView(onDelete)}
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        rightOpenValue={-100}
      >
        <TouchableOpacity>
          <View style={styles.MainItemContainer}>
            <Text style={styles.AirLineTextStyle}>
              {item.outbound ? `${item.outbound.airline} / ${item.return.airline}` : item.airline}
            </Text>
            <View style={styles.InfoContainer}>
              <View style={styles.TimeContainer}>
                <Text style={{ fontWeight: 'bold' }}>{formatTime(item.outbound ? item.outbound.departureTime : item.departureTime)}</Text>
                <View style={styles.dottedLine} />
                {item.isDirectFlight === true || (item.outbound && item.outbound.isDirectFlight === true) ? (
                  <View><Text style={styles.Direct}>Direct</Text></View>
                ) : (
                  item.isDirectFlight === false || (item.outbound && item.outbound.isDirectFlight === false) ? (
                    <View>
                      <View style={styles.blueDot}></View>
                      <View>
                        <Text style={styles.stopOverCountry}>{item.outbound ? item.outbound.stopoverCountry : item.stopoverCountry}</Text>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )
                )}
                {item.outbound ? <Text style={{ fontWeight: 'bold' }}>{formatTime(item.outbound.arrivalTime)}</Text> : <Text style={{ fontWeight: 'bold' }}>{formatTime(item.arrivalTime)}</Text>}
              </View>
              <Text style={styles.AirprtFrm}>{item.outbound ? shortenAirportName(item.outbound.from.airport) : shortenAirportName(item.from.airport)}</Text>
              <Text style={styles.Duration}> {item.outbound ? item.outbound.duration : item.duration}</Text>
              <Text style={styles.AirprtTo}>{item.outbound ? shortenAirportName(item.outbound.to.airport) : shortenAirportName(item.to.airport)}</Text>
              <Text style={styles.Price}>{item.outbound ? null : `${item.price} €`}</Text>
            </View>
            {item.return && (
              <View style={{ marginTop: 10 }}>
                <View style={styles.TimeContainerRtrn}>
                  <Text style={{ fontWeight: 'bold' }}>{formatTime(item.return.departureTime)}</Text>
                  <View style={styles.dottedLine} />
                  {item.return.isDirectFlight === true ? (
                    <View><Text style={styles.Direct}>Direct</Text></View>
                  ) : (
                    item.return.isDirectFlight === false ? (
                      <View>
                        <View style={styles.blueDot}></View>
                        <View>
                          <Text style={styles.stopOverCountry}>{item.return.stopoverCountry}</Text>
                        </View>
                      </View>
                    ) : (
                      <View></View>
                    )
                  )}
                  <Text style={{ fontWeight: 'bold' }}>{formatTime(item.return.arrivalTime)}</Text>
                </View>
                <Text style={styles.AirprtFrm2}>{shortenAirportName(item.return.from.airport)}</Text>
                <Text style={styles.Duration2}> {item.return.duration}</Text>
                <Text style={styles.AirprtTo2}>{shortenAirportName(item.return.to.airport)}</Text>
                <Text style={styles.Price2}>{`${item.return.price + item.outbound.price} €`}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }

  return (
    <View style={styles.MainContainerStyle}>
      {labelContext.loading == true ? <Loader loading={userContext.loading} /> : labelContext.loading == false}

      {/* <ScrollView keyboardShouldPersistTaps="handled" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={'#27aae2'} />}> */}
      <FlatList
        data={userContext.favoriteOneWayFlights.concat(userContext.favoriteRoundTripFlights)}
        keyExtractor={item => item._id + ""}
        renderItem={v => renderFavFlights(v, async () => {
          const err = await deleteItemdata(v.item);
          if (err !== null) {
            row[v.index].close();
            Alert.alert("Error", err?.message);
          }
        })}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {/* </ScrollView> */}
    </View>
  );
}

export default SavedFlights;