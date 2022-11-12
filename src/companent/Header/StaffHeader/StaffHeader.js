import React from 'react';
import {Text, View, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import IconFont from 'react-native-vector-icons/FontAwesome';

import Styles from './Style';
import IconButton from '../../FormElement/IconButton';

const StaffHeader = ({isFilterShow = true}) => {
  const staff = useSelector(s => s.staff);
  const dispatch = useDispatch();

  const onExit = () => {
    dispatch({type: 'UPDATE_STAFF', payload: {staff: null}});
  };

  return (
    <View style={Styles.header}>
      <View style={Styles.circleUser}>
        <IconFont name="user-o" color={'white'} size={20} />
      </View>
      <View style={Styles.headerTextView}>
        <Text style={{color: 'white'}}>{staff?.username}</Text>
      </View>
      {isFilterShow && (
          <IconButton
            icon={{
              name: 'filter',
              size: 20,
              textColor: 'white',
            }} style={{marginRight:20}}
            handlePress={() => {
              DeviceEventEmitter.emit('SHOW_FILTER', {test: ''});
            }}
          />
        )}
      <TouchableOpacity style={Styles.circleExit} onPress={onExit}>
        <IconFont name="power-off" color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default StaffHeader;
