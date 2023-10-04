import {useState} from 'react';

import {View, Text} from 'react-native';

const FlightSerch = ({from, to, date}) => {
  const [data, setdata] = useState([]);

  const url = `http://localhost:3001/search?from=${from}&to=${to}&date=${date}`;

  fetch(url).then(response =>
    response
      .json()
      .then(json => setdata(json))
      .catch(erorr => console.log(erorr)),
  );

  return (
    <View>
      {data.map(post => (
        <Text></Text>
      ))}
    </View>
  );
};
export default FlightSerch;
