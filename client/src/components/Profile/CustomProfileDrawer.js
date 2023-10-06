import React from 'react';
import {View,Text,ImageBackground,Image,TouchableOpacity} from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useUserContext } from '../../services/UserContext';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
    const userContext = useUserContext();
    const labelContext = useSignupFormContext();
    const authContext = useAuthContext();

    const getUsername = async () => {
        let userInfo = await EncryptedStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        if (userInfo) {
            userContext.setEmail(userInfo.user);
        }
    }

    const handleLogout = () => {
        labelContext.setLoading(true);
        userContext.setFirstname('');
        userContext.setLastname('');
        userContext.setEmail('');
        userContext.setPassword('');
        userContext.setDay('');
        userContext.setMonth('');
        userContext.setYear('');
        userContext.setGender('');
        authContext.logout(userContext);
    }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
          source={require('../../assets/images/background2.jpg')}
          style={{padding: 30}}>
          <Image
            source={require('../../assets/images/man.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {userContext.firstname} {userContext.lastname}
          </Text>
        </ImageBackground>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={handleLogout} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'red'}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#ff0000' 
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;