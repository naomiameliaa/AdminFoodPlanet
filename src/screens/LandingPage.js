import * as React from 'react';
import {
  View,
<<<<<<< HEAD
  Text,
=======
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
<<<<<<< HEAD
=======
  ImageBackground,
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
} from 'react-native';
import axios from 'axios';
import ButtonKit from '../components/ButtonKit';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import {AuthContext} from '../../context';
<<<<<<< HEAD
import {storeData, alertMessage} from '../utils';
=======
import {storeData, alertMessage, normalize} from '../utils';
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    padding: 30,
  },
  txtTitle: {
    margin: 20,
    color: theme.colors.red,
=======
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: theme.colors.white_70,
    marginHorizontal: normalize(20),
    padding: normalize(20),
    borderRadius: 20,
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: normalize(20),
    color: theme.colors.dark_red,
    alignSelf: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: normalize(10),
    padding: normalize(15),
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  },
  inputContainer: {
    alignItems: 'center',
  },
  inputStyle: {
<<<<<<< HEAD
    width: SCREEN_WIDTH * 0.9,
=======
    width: '90%',
    height: normalize(37),
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  loginTxt: {
    color: theme.colors.white,
<<<<<<< HEAD
    fontSize: 18,
  },
  loginWrapper: {
    backgroundColor: theme.colors.red,
    width: SCREEN_WIDTH * 0.6,
=======
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  loginWrapper: {
    backgroundColor: theme.colors.red,
    width: '40%',
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
<<<<<<< HEAD
});

function LandingPage() {
=======
  forgotPasswordTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.dark_red,
  },
  forgotPasswordWrapper: {
    alignSelf: 'flex-start',
    marginLeft: normalize(20),
  },
});

function LandingPage({navigation}) {
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  const {signIn} = React.useContext(AuthContext);
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const validationLogin = () => {
    if (email.length === 0 || password.length === 0) {
      alertMessage({
        titleMessage: 'Warning !',
        bodyMessage: 'All data must be filled',
        btnText: 'Try Again',
        btnCancel: false,
      });
    } else {
      login();
    }
  };

  async function login() {
    try {
      const response = await axios.get(
<<<<<<< HEAD
        // 'https://food-planet.herokuapp.com/users/login',
        'http://172.18.0.1:8080/users/login',
=======
        'https://food-planet.herokuapp.com/users/login',
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        {
          params: {
            role: 'admin',
          },
          auth: {
<<<<<<< HEAD
            // username: email,
            // password: password,

            username: 'admin@mail.com',
            password: 'password',
=======
            username: email,
            password: password,
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
          },
        },
      );
      if (response.data.msg === 'Login success') {
        storeData('adminData', response.data.object);
        signIn();
      }
    } catch (error) {
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'Incorrect password or email',
        btnText: 'Try Again',
        btnCancel: false,
      });
      setErrorMessage('Something went wrong');
      console.log('error:', error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <Title text="Admin Login" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          textContentType="emailAddress"
          autoCapitalize="none"
          placeholder="Email"
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          textContentType="password"
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry={true}
        />
        <ButtonText
          title="Log in"
          txtStyle={styles.loginTxt}
          wrapperStyle={styles.loginWrapper}
          onPress={login}
        />
      </View>
=======
      <ImageBackground
        style={styles.backgroundImg}
        source={require('../assets/landing-page.jpg')}>
        <View style={styles.contentWrapper}>
          <Title txtStyle={styles.txtTitle} text="Login to your account" />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeEmail(text)}
              value={email}
              textContentType="emailAddress"
              autoCapitalize="none"
              placeholder="Admin Email"
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangePassword(text)}
              value={password}
              textContentType="password"
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={true}
            />
            <ButtonText
              title="Forgot Password ?"
              txtStyle={styles.forgotPasswordTxt}
              wrapperStyle={styles.forgotPasswordWrapper}
              onPress={() => navigation.navigate('ForgotPasswordPage')}
            />
            <ButtonText
              title="LOGIN"
              txtStyle={styles.loginTxt}
              wrapperStyle={styles.loginWrapper}
              onPress={validationLogin}
            />
          </View>
        </View>
      </ImageBackground>
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    </SafeAreaView>
  );
}

export default LandingPage;
