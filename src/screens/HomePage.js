/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
<<<<<<< HEAD
=======
  ScrollView,
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
} from 'react-native';
import axios from 'axios';
import ButtonKit from '../components/ButtonKit';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import {normalize, getData, removeData, alertMessage} from '../utils';
import SpinnerKit from '../components/SpinnerKit';
<<<<<<< HEAD
=======
import {AuthContext} from '../../context';
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  txtTitle: {
    margin: 20,
    color: theme.colors.red,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    marginVertical: normalize(20),
=======
    marginVertical: normalize(30),
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  },
  btnWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: normalize()
  },
  foodcourtImg: {
    borderRadius: 9,
    width: '100%',
    height: 200,
  },
  titleFoodCourt: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  spinnerKitStyle: {
    marginTop: normalize(80),
  },
  btnLogoutWrapper: {
<<<<<<< HEAD
    width: '30%',
    alignSelf: 'flex-end',
    paddingBottom: 20,
  },
  btnTxtLogout: {
    color: theme.colors.red,
    fontSize: normalize(20),
    fontWeight: 'bold',
=======
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
  btnTxtLogout: {
    backgroundColor: theme.colors.red,
    color: theme.colors.white,
    fontSize: normalize(18),
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 10,
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  },
  btnStyle: {
    width: normalize(100),
    height: normalize(100),
    margin: 20,
  },
  txtStyle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

function HomePage({navigation}) {
  const [foodcourt, setFoodcourt] = React.useState({});
<<<<<<< HEAD
=======
  const {signOut} = React.useContext(AuthContext);
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  async function getFoodcourtById() {
    setIsLoading(true);
    const foodcourtId = await getDataAdmin();
<<<<<<< HEAD
    console.log('FOODCOURT ID: ', foodcourtId);
    try {
      const response = await axios.get(
        // 'https://food-planet.herokuapp.com/foodcourts',
        'http://172.18.0.1:8080/foodcourts/searchById/',
=======
    try {
      const response = await axios.get(
        'https://food-planet.herokuapp.com/foodcourts/searchById',
        // 'http://172.18.0.1:8080/foodcourts/searchById/',
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        {
          params: {
            foodcourtId: foodcourtId,
          },
<<<<<<< HEAD
          auth: {
            username: 'admin@mail.com',
            password: 'password',
          },
        },
      );
      if (response.data.msg === 'Query success') {
        console.log('DATA: ', response.data.object);
=======
        },
      );
      if (response.data.msg === 'Query success') {
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        setFoodcourt(response.data.object);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      console.log('error:', error);
    }
    setIsLoading(false);
  }

<<<<<<< HEAD
  const checkLogout = async () => {
    const checkAdminData = await getDataAdmin();
    if (checkAdminData !== null) {
      await removeData('adminData');
      logout();
    }
    logout();
=======
  const signOutAdmin = async () => {
    const removeLocalData = await removeData('adminData');
    if (removeLocalData) {
      signOut();
    }
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  };

  const getDataAdmin = async () => {
    const dataAdmin = await getData('adminData');
    if (getDataAdmin !== null) {
      return dataAdmin.foodcourtId;
    } else {
      return null;
    }
  };

  async function logout() {
    setIsLoading(true);
    try {
      const response = await axios.post(
<<<<<<< HEAD
        // 'https://food-planet.herokuapp.com/users/logout',
        'http://172.18.0.1:8080/users/logout',
=======
        'https://food-planet.herokuapp.com/users/logout',
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      );
      if (response.data.object === 'Logout success') {
        alertMessage({
          titleMessage: 'Success',
          bodyMessage: 'Logout success!',
          btnText: 'OK',
          btnCancel: false,
<<<<<<< HEAD
=======
          onPressOK: () => signOutAdmin(),
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
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
    setIsLoading(false);
  }

  React.useEffect(() => {
    getFoodcourtById();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SpinnerKit sizeSpinner="large" style={styles.spinnerKitStyle} />
      ) : (
<<<<<<< HEAD
        <View>
          <ButtonText
            title="Log out"
            onPress={() => checkLogout()}
            txtStyle={styles.btnTxtLogout}
            wrapperStyle={styles.btnLogoutWrapper}
=======
        <ScrollView showsVerticalScrollIndicator={false}>
          <ButtonText
            title="Log out"
            txtStyle={styles.btnTxtLogout}
            wrapperStyle={styles.btnLogoutWrapper}
            onPress={() => logout()}
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
          />
          <Title text="Welcome, Admin !" />
          <Image
            style={styles.foodcourtImg}
            source={{uri: `data:image/jpeg;base64,${foodcourt.image}`}}
          />
          <Text style={styles.titleFoodCourt}>{foodcourt.name}</Text>
          <Text>{foodcourt.address}</Text>
          <Text>{foodcourt.description}</Text>
          <View style={styles.btnContainer}>
            <View style={styles.btnWrapper}>
              <ButtonKit
                wrapperStyle={styles.btnStyle}
                source={require('../assets/settings-gears.png')}
                onPress={() => {
                  navigation.navigate('ManageTenantPage');
                }}
              />
              <Text style={styles.txtStyle}>Manage Tenant</Text>
            </View>
            <View style={styles.btnWrapper}>
              <ButtonKit
                wrapperStyle={styles.btnStyle}
                source={require('../assets/edit-info.png')}
                onPress={() => {
                  navigation.navigate('EditProfilePage', {
<<<<<<< HEAD
                    foodcourtImage: foodcourt.image,
=======
                    foodcourt_name: foodcourt.name,
                    foodcourt_address: foodcourt.address,
                    foodcourt_description: foodcourt.description,
                    foodcourt_image: foodcourt.image,
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
                  });
                }}
              />
              <Text style={styles.txtStyle}>Edit Foodcourt Information</Text>
            </View>
          </View>
<<<<<<< HEAD
        </View>
=======
        </ScrollView>
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      )}
    </SafeAreaView>
  );
}

export default HomePage;
