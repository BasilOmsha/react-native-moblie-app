import { User } from './src/services/UserContext';
import { Labels } from './src/services/signupServices/SignupLabelsContext';
import { Auth } from './src/services/loginServices/AuthContext';
import NavButton from './components/navigation/mainAppNav';
import { DataProvider } from './context/globalData';

const App = () => (
  <User>
    <Labels>
      <Auth>
        <DataProvider>
          <NavButton />
        </DataProvider>
      </Auth>
    </Labels>
  </User>
);
export default App;
