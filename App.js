import * as React from 'react';
import 'react-native-gesture-handler';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './context';
import { getData } from './src/utils';
=======
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './context';
import {getData} from './src/utils';
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
import LandingPage from './src/screens/LandingPage';
import HomePage from './src/screens/HomePage';
import ManageTenantPage from './src/screens/ManageTenantPage';
import TenantDetailPage from './src/screens/TenantDetailPage';
import EditProfilePage from './src/screens/EditProfilePage';
import AddTenantPage from './src/screens/AddTenantPage';
import EditTenantPage from './src/screens/EditTenantPage';
<<<<<<< HEAD
=======
import ForgotPasswordPage from './src/screens/ForgotPasswordPage';
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="LandingPage"
      component={LandingPage}
<<<<<<< HEAD
      options={{ headerShown: false }}
=======
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ForgotPasswordPage"
      component={ForgotPasswordPage}
      options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomePage"
        component={HomePage}
<<<<<<< HEAD
        options={{ headerShown: false }}
=======
        options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      />
      <HomeStack.Screen
        name="ManageTenantPage"
        component={ManageTenantPage}
<<<<<<< HEAD
        options={{ headerShown: false }}
=======
        options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      />
      <HomeStack.Screen
        name="TenantDetailPage"
        component={TenantDetailPage}
<<<<<<< HEAD
        options={{ headerShown: false }}
=======
        options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      />
      <HomeStack.Screen
        name="EditProfilePage"
        component={EditProfilePage}
<<<<<<< HEAD
        options={{ headerShown: false }}
=======
        options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      />
      <HomeStack.Screen
        name="AddTenantPage"
        component={AddTenantPage}
<<<<<<< HEAD
        options={{ headerShown: false }}
=======
        options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      />
      <HomeStack.Screen
        name="EditTenantPage"
        component={EditTenantPage}
<<<<<<< HEAD
        options={{ headerShown: false }}
=======
        options={{headerShown: false}}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      />
    </HomeStack.Navigator>
  );
}
const RootStack = createStackNavigator();
<<<<<<< HEAD
const RootStackScreen = ({ adminData }) => (
=======
const RootStackScreen = ({adminData}) => (
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  <RootStack.Navigator>
    {adminData ? (
      <RootStack.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
<<<<<<< HEAD
        options={{ headerShown: false }}
      />
    ) : (
        <RootStack.Screen
          name="AuthStackScreen"
          component={AuthStackScreen}
          options={{ headerShown: false }}
        />
      )}
=======
        options={{headerShown: false}}
      />
    ) : (
      <RootStack.Screen
        name="AuthStackScreen"
        component={AuthStackScreen}
        options={{headerShown: false}}
      />
    )}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  </RootStack.Navigator>
);

function App() {
  const getDataAdmin = async (key) => {
    const dataAdmin = await getData(key);
    if (dataAdmin !== null) {
      setAdminData(dataAdmin);
    } else {
      setAdminData(null);
    }
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [adminData, setAdminData] = React.useState(null);

  React.useEffect(() => {
    getDataAdmin('adminData');
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setAdminData(getDataAdmin('adminData'));
      },
      signUp: () => {
        setIsLoading(false);
      },
      signOut: () => {
        setIsLoading(false);
        setAdminData(null);
      },
    };
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen adminData={adminData} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
