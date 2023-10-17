import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, FlatList, TouchableOpacity, Button, Alert, Animated, TouchableHighLight, StatusBar, Pressable } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useUserContext } from '../../services/UserContext';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import IsNotAuthenticated from '../../services/loginServices/IsNotAuthenticated';
import GetUsrFavFlights from '../../services/profileServices/GetUsrFavFlights';
import Loader from '../../services/Loader';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../styles/FavScreenStyle';
import DeleteFavFlight from '../../services/profileServices/DeleteFavFlights';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const formatTime = (utcTimestamp) => {
  if (utcTimestamp) {
    const date = new Date(utcTimestamp);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return '';
};

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
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
    await GetUsrFavFlights(authContext, userContext, labelContext);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const onRefreshRemoval = useCallback(async () => {
    setRefreshing(true);
    labelContext.setErrortext(null);
    Alert.alert('               ' + '\n' + '      Flight removed from favorites!  ', '', [], { cancelable: true, });
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const onRefreshRemoval2 = useCallback(async () => {
    setRefreshing(true);
    labelContext.setErrortext(null);
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

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    try {
      await DeleteFavFlight(rowKey, userContext, labelContext);
      await GetUsrFavFlights(authContext, userContext, labelContext);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };


  const ActionItem = props => {
    const { swipeAnimatedValue, leftActionActivated, rightActionActivated, rowActionAnimatedValue, rowHeightAnimatedValue, onClose, onDelete } = props;

    if (rightActionActivated) {
      console.log("rightActionActivated " + rightActionActivated)
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
        {/* <Text>Left</Text> */}
        {!leftActionActivated && (
          <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
            <Animated.View style={[styles.trash, {
              transform: [{
                translateX: swipeAnimatedValue.interpolate({
                  inputRange: [-150, 0],
                  outputRange: [0, 150],
                  extrapolate: 'clamp'
                }),
              },
              ],
            }]}>
              <MaterialIcons name='close-circle-outline' size={25} style={styles.trash} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
              <Animated.View style={[styles.trash, {
                transform: [{
                  translateX: swipeAnimatedValue.interpolate({
                    inputRange: [-150, 0],
                    outputRange: [0, 75],
                    extrapolate: 'clamp'
                  }),
                },
                ],
              }]}>
                <MaterialIcons name='trash-can-outline' size={30} color="#fff" />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    )
  }

  const renderHiddenItem = ({ item, index }, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(200);
    return (
      <ActionItem
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, item._id.toString())}
        onDelete={() => {
          deleteRow(rowMap, item._id.toString());
          onRefreshRemoval();
        }
        }
      />
    );
  }


  const RenderFavFlights = props => {
    const { rowHeightAnimatedValue, removeRow, item, index, leftActionState, rightActionState } = props;
    // console.log("rightActionState " + rightActionState)
    if (rightActionState) {
      console.log("rightActionState " + rightActionState)
      ReactNativeHapticFeedback.trigger("impactLight", options);
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
        console.log("test")
      });
    }

    return (
      <Animated.View style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
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
      </Animated.View >
    );
  }

  const renderItem = ({ item, index }, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(200);

    return (
      <RenderFavFlights
        rowMap={rowMap}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => {
          deleteRow(rowMap, item._id.toString());
          onRefreshRemoval2();
        }}
        item={item}
      />
    );
  }

  return (
    <View style={styles.MainContainerStyle}>
      {labelContext.loading == true ? <Loader loading={userContext.loading} /> : labelContext.loading == false}
      <SwipeListView
        data={userContext.favoriteOneWayFlights.concat(userContext.favoriteRoundTripFlights)}
        keyExtractor={item => item._id + ""}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        refreshing={refreshing}
        onRefresh={onRefresh}
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-250}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
}

export default SavedFlights;