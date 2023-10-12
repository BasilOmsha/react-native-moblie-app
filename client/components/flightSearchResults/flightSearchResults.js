import React, { useEffect, useCallback, useState } from 'react';
import { Button, View, ScrollView, Alert, RefreshControl } from 'react-native';
import FlightListOutbound from '../flatList/flightListOutbound';
import FlightListReturn from '../flatList/flightListReturn';
import { useAuthContext } from '../../src/services/loginServices/AuthContext';
import { useSignupFormContext } from '../../src/services/signupServices/SignupLabelsContext';
import { useUserContext } from '../../src/services/UserContext';
import IsNotAuthenticated from '../../src/services/loginServices/IsNotAuthenticated';
import GetUserData from '../../src/services/profileServices/GetUserData';
import Loader from '../../src/services/Loader';

const FlightSearchResults = ({ route, navigation }) => {
  const { round, combinedFlights, data } = route.params;

  /*Added by Basel*/
  // Is the user token still valid
  const authContext = useAuthContext();
  const labelContext = useSignupFormContext();
  const userContext = useUserContext();
  async function triggerFunctions() {
    await IsNotAuthenticated(labelContext, authContext);
  }
  useEffect(() => {
    triggerFunctions();
  }, []);
  /*Added by Basel ends here*/

  return (
    <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
      
      {round ? (
        <FlightListReturn data={combinedFlights} round={round}  />
      ) : (
        <FlightListOutbound data={data}  />
      )}

    </View>
  );
};

export default FlightSearchResults;
