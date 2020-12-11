/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import {normalize} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(20),
  },
  contentContainer: {
    marginHorizontal: normalize(20),
  },
  txtTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputStyle: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
  },
  txtSend: {
    color: theme.colors.white,
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  btnSendWrapper: {
    backgroundColor: theme.colors.red,
    width: '70%',
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

function forgotPasswordPage({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Title txtStyle={styles.txtTitle} text="Forgot Password" />
        <Text style={styles.textStyle}>
          Please enter your email to receive a link to create a new password via
          email
        </Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          textContentType="email"
          autoCapitalize="none"
          placeholder="Email"
        />
        <ButtonText
          title="Send"
          txtStyle={styles.txtSend}
          wrapperStyle={styles.btnSendWrapper}
          // onPress={validationLogin}
        />
      </View>
    </SafeAreaView>
  );
}

export default forgotPasswordPage;
