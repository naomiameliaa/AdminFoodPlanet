import * as React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import ButtonKit from '../components/ButtonKit';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import {normalize, getData, removeData, alertMessage} from '../utils';
import SpinnerKit from '../components/SpinnerKit';
import {AuthContext} from '../../context';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(10),
  },
  btnLogoutWrapper: {
    alignSelf: 'flex-end',
    height: '5%',
  },
  btnTxtLogout: {
    color: theme.colors.red,
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: normalize(20),
    marginTop: normalize(20),
  },
  foodcourtImg: {
    borderRadius: 10,
    width: '100%',
    height: 200,
  },
  titleFoodCourt: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginTop: normalize(10),
    marginBottom: normalize(5),
  },
  txtStyle: {
    marginBottom: 3,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
  },
  btnTextWrapper: {
    backgroundColor: theme.colors.red,
    width: SCREEN_WIDTH * 0.7,
    borderRadius: 20,
    paddingVertical: 12,
    marginVertical: 10,
  },
  btnContainer: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalize(40),
  },
  btnWrapper: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    width: '70%',
    height: '70%',
    marginBottom: 8,
  },
  btnText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerKitStyle: {
    marginTop: normalize(80),
  },
});

function HomePage({navigation}) {
  const [foodcourtData, setFoodcourtData] = React.useState([]);
  const {signOut} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = React.useState(false);

  async function getFoodcourtById() {
    setIsLoading(true);
    const foodcourtId = await getDataAdmin();
    try {
      const response = await axios.get(
        'https://food-planet.herokuapp.com/foodcourts/searchById',
        {
          params: {
            foodcourtId: foodcourtId,
          },
        },
      );
      if (response.data.msg === 'Query success') {
        setFoodcourtData(response.data.object);
      }
    } catch (error) {
      console.log('error:', error);
      alertMessage({
        titleMessage: 'Session Timeout',
        bodyMessage: 'Please re-login',
        btnText: 'OK',
        onPressOK: () => signOutAdmin(),
        btnCancel: false,
      });
    }
    setIsLoading(false);
  }

  const signOutAdmin = async () => {
    const removeLocalData = await removeData('adminData');
    if (removeLocalData) {
      signOut();
    }
  };

  const getDataAdmin = async () => {
    const dataAdmin = await getData('adminData');
    if (dataAdmin) {
      return dataAdmin.foodcourtId;
    } else {
      return null;
    }
  };

  async function logout() {
    setIsLoadingLogout(true);
    try {
      const response = await axios.post(
        'https://food-planet.herokuapp.com/users/logout',
      );
      if (response.data.object === 'Logout success') {
        alertMessage({
          titleMessage: 'Success',
          bodyMessage: 'Logout success!',
          btnText: 'OK',
          btnCancel: false,
          onPressOK: () => signOutAdmin(),
        });
      }
    } catch (error) {
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'Incorrect password or email',
        btnText: 'Try Again',
        btnCancel: false,
      });
    }
    setIsLoadingLogout(false);
  }

  React.useEffect(() => {
    getFoodcourtById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SpinnerKit sizeSpinner="large" style={styles.spinnerKitStyle} />
      ) : (
        <View style={styles.innerContainer}>
          <ButtonText
            title="Log out"
            txtStyle={styles.btnTxtLogout}
            wrapperStyle={styles.btnLogoutWrapper}
            onPress={() => logout()}
            isLoading={isLoadingLogout}
            colorSpinner={theme.colors.red}
          />
          <Title text="Welcome, Admin!" txtStyle={styles.titleStyle} />
          <Image
            style={styles.foodcourtImg}
            source={{uri: `data:image/jpeg;base64,${foodcourtData.image}`}}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.titleFoodCourt} numberOfLines={1}>
              {foodcourtData.name}
            </Text>
            <Text style={styles.txtStyle}>{foodcourtData.address}</Text>
            <Text style={styles.txtStyle}>{foodcourtData.description}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => {
                navigation.navigate('ManageTenantPage');
              }}>
              <Image
                style={styles.btnStyle}
                source={require('../assets/settings-gears.png')}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Manage Tenant</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => {
                navigation.navigate('EditProfilePage', {
                  foodcourt_name: foodcourtData.name,
                  foodcourt_address: foodcourtData.address,
                  foodcourt_description: foodcourtData.description,
                  foodcourt_image: foodcourtData.image,
                });
              }}>
              <Image
                style={styles.btnStyle}
                source={require('../assets/edit-info.png')}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Edit Foodcourt Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => {
                navigation.navigate('ChangePasswordPage');
              }}>
              <Image
                style={styles.btnStyle}
                source={require('../assets/padlock.png')}
                resizeMode="contain"
              />
              <Text style={styles.btnText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomePage;
