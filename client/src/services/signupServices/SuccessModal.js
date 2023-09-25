import React from 'react';
import { StyleSheet, View, Modal, Image, Text, TouchableOpacity } from 'react-native';

const SuccessModal = props => {
    return (
        <Modal>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../assets/images/greencheck.png')}
                    style={{
                        height: 250,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    // Change to login screen
                    // onPress={() => props.navigation.navigate('Registration')}>
                    onPress={props.navToLogin}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        </Modal >
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    successTextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    buttonStyle: {
        backgroundColor: '#27aae2',
        borderWidth: 0,
        color: '#fff',
        borderColor: '#27aae2',
        height: 40,
        width: 200,
        alignItems: 'center',
        borderRadius: 8,
        marginLeft: 105,
        marginRight: 95,
        marginTop: 5,
        marginBottom: 5,
    },
    buttonTextStyle: {
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
});