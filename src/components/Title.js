import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {normalize} from '../utils';
// test
const styles = StyleSheet.create({
  textStyle: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

function Title({text, txtStyle}) {
  return <Text style={[styles.textStyle, txtStyle]}>{text}</Text>;
}

export default Title;
