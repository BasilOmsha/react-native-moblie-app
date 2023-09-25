import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
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
            color="#000000"
            size="large"
            style={loaderStyles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;