import NavButton from './components/navigation/mainAppNav';
import {DataProvider} from './context/globalData';

const App = () => (
  <DataProvider>
    <NavButton />
  </DataProvider>
);
export default App;
