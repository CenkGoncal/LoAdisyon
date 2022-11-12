import React from 'react';
import {View, Text} from 'react-native';
import Styles from './Style';

const Logo = () => {
  return (
    <View style={Styles.logoContainer}>
      <Text style={Styles.logo}>LöAdisyo</Text>
      <Text style={Styles.logoSubText}>Yeni Nesil Adisyon Platormu</Text>
    </View>
  );
};

export default Logo;
