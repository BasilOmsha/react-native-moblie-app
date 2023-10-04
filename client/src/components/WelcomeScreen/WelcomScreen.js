import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSignupFormContext } from '../../services/signupServices/SignupLabelsContext';
import isAuthenticated from '../../services/loginServices/IsAuthenticated';
import { useAuthContext } from '../../services/loginServices/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const WelcomeScreen = ({ navigation }) => {
    const authContext = useAuthContext();
    const labelContext = useSignupFormContext();
    useEffect(() => {
        isAuthenticated(authContext, labelContext);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
            {/* <ScrollView > */}
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            fontFamily: 'Inter-Bold',
                            fontSize: 30,
                            color: '#20315f',
                        }}>
                        HORIZON
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/airplain.png')}
                        style={{
                            width: 200,
                            height: 200,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#27aae2',
                        padding: 20,
                        width: '90%',
                        borderRadius: 10,
                        marginBottom: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    onPress={() => navigation.navigate('Login')}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            textAlign: 'center',
                            fontFamily: 'Roboto-MediumItalic',
                        }}>
                        Login
                    </Text>
                    <MaterialIcons name="arrow-forward" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#AD40AF',
                        padding: 20,
                        width: '90%',
                        borderRadius: 10,
                        marginBottom: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                // onPress={() => navigation.navigate('#')}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            textAlign: 'center',
                            fontFamily: 'Roboto-MediumItalic',
                        }}>
                        Continue As a Guest
                    </Text>
                    <MaterialIcons name="arrow-forward" size={22} color="#fff" />
                </TouchableOpacity>
            {/* </ScrollView> */}
        </View>
    );
};

export default WelcomeScreen;