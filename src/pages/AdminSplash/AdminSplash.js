import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import colors from '../../styles/colors';
import style from './Style';

const AdminSplash = () => {
  return (
    <View style={style.container}>
      <Text style={style.logo}>LöAdisyo</Text>
      <Text style={style.logoSubText}>Yeni Nesil Adisyon Platormu</Text>
      <ActivityIndicator
        size="large"
        color={colors.lightGreen}
        style={style.loading}
      />
    </View>
  );
};
export default AdminSplash;
