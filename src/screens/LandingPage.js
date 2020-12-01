import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import ButtonKit from '../components/ButtonKit';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import {AuthContext} from '../../context';
import {storeData, alertMessage} from '../utils';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  txtTitle: {
    margin: 20,
    color: theme.colors.red,
  },
  inputContainer: {
    alignItems: 'center',
  },
  inputStyle: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  loginTxt: {
    color: theme.colors.white,
    fontSize: 18,
  },
  loginWrapper: {
    backgroundColor: theme.colors.red,
    width: SCREEN_WIDTH * 0.6,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
});

function LandingPage() {
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
        // 'https://food-planet.herokuapp.com/users/login',
        'http://172.18.0.1:8080/users/login',
        {
          params: {
            role: 'admin',
          },
          auth: {
            // username: email,
            // password: password,

            username: 'admin@mail.com',
            password: 'password',
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
    </SafeAreaView>
  );
}

export default LandingPage;
