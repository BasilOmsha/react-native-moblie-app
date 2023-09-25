import React from 'react';
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import loaderStyles from '../styles/LoaderStyle';

const Loader = props => {
  const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={loaderStyles.modalBackground}>
        <View >
          <ActivityIndicator
            animating={true}
            color="#27aae2"
            size="large"
            style={loaderStyles.activityIndicator}
          />
          <Text style={loaderStyles.indicatorTExtStyle}>Bending time and space...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;