import React, {useRef, useEffect} from 'react';
import {Text, Animated} from 'react-native';
import styles from './style';

const ShowMessage = ({message, type, refresh, onFinishFunc}) => {
  var fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(1);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start(onFinishFunc);
  }, [refresh]);

  return (
    <>
      {message != "" && (
        <Animated.View style={styles[type].container(fadeAnim)}>
          <Text style={styles[type].text}>{message}</Text>
        </Animated.View>
      )}
    </>
  );
};

export default ShowMessage;
