import {TouchableOpacity, Text, View, ScrollView} from 'react-native';
import {styles} from '../../styles/globalStyles';

export const ModalScrollView = ({data, handleInput, toggle}) => {
  return (
    <ScrollView style={styles.airlineList}>
      <View
        style={{
          backgroundColor: '#27aae2',
          margin: 10,
          borderRadius: 8,
        }}>
        <Text style={styles.airlineTextHeader}>List of airlines</Text>
        <TouchableOpacity onPress={toggle}>
          <Text style={styles.cancelAirlineToggle}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {data.map((item, index) => (
        <TouchableOpacity
          key={index.toString()}
          style={styles.airlineItem}
          onPress={() => {
            handleInput(item);
            toggle();
          }}>
          <Text style={styles.airlineText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
