// Loader (ActivityIndicator) styles
import { StyleSheet } from 'react-native';

const loaderStyles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    // not in use
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  });

  export default loaderStyles;