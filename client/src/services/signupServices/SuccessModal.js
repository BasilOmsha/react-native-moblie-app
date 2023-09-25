import React from 'react';
import { StyleSheet, View, Modal, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SignupStyle';

const SuccessModal = props => {
    return (
        <Modal>
            <View style={styles.signupSuccessView}>
                <Image
                    source={require('../../assets/images/greencheck.png')}
                    style={styles.signupSunccessImgStyle}
                />
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={props.navToLogin}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        </Modal >
    );
};

export default SuccessModal;