import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './context';
import {getData} from './src/utils';
import LandingPage from './src/screens/LandingPage';
import HomePage from './src/screens/HomePage';
import ManageTenantPage from './src/screens/ManageTenantPage';
import TenantDetailPage from './src/screens/TenantDetailPage';
import EditProfilePage from './src/screens/EditProfilePage';
import AddTenantPage from './src/screens/AddTenantPage';
import EditTenantPage from './src/screens/EditTenantPage';
import ForgotPasswordPage from './src/screens/ForgotPasswordPage';
import ChangePasswordPage from './src/screens/ChangePasswordPage';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="LandingPage"
      component={LandingPage}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ForgotPasswordPage"
      component={ForgotPasswordPage}
      options={{headerShown: false}}
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
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ManageTenantPage"
        component={ManageTenantPage}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="TenantDetailPage"
        component={TenantDetailPage}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="EditProfilePage"
        component={EditProfilePage}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ChangePasswordPage"
        component={ChangePasswordPage}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AddTenantPage"
        component={AddTenantPage}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="EditTenantPage"
        component={EditTenantPage}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
const RootStack = createStackNavigator();
const RootStackScreen = ({adminData}) => (
  <RootStack.Navigator>
    {adminData ? (
      <RootStack.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
    ) : (
      <RootStack.Screen
        name="AuthStackScreen"
        component={AuthStackScreen}
        options={{headerShown: false}}
      />
    )}
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
