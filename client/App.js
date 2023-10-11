import { User } from './src/services/UserContext';
import { Labels } from './src/services/signupServices/SignupLabelsContext';
import { Auth } from './src/services/loginServices/AuthContext';
import NavButton from './components/navigation/mainAppNav';
import { DataProvider } from './context/globalData';

const App = () => (
  <DataProvider>
    <User>
      <Labels>
        <Auth>
          <NavButton />
        </Auth>
      </Labels>
    </User>
  </DataProvider>
);

export default App;
