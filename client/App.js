import NavButton from './components/navigation/mainAppNav';
import {DataProvider} from './context/globalData';

const App = () => (
  <DataProvider>
    <NavButton />
  </DataProvider>
);
export default App;





// import React from 'react';
// // import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import AppNav from './src/components/Navigation/AppNav';
// import { User } from './src/services/UserContext';
// import { Labels } from './src/services/signupServices/SignupLabelsContext';
// import { Auth } from './src/services/loginServices/AuthContext';

// const App = () => {

//   return (
//     <User>
//       <Labels>
//         <Auth>
//           <AppNav />
//         </Auth>
//       </Labels>
//     </User>
//   );
// };
// export default App;
