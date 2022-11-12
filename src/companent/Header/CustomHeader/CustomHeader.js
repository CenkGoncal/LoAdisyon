import React from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import IconButton from '../../FormElement/IconButton';

import Styles from './Style';

export default CustomHeader = ({isFilterShow}) => {  
  return (
    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
      {isFilterShow && (
        <IconButton
          icon={{
            name: 'filter',
            size: 20,
            textColor: 'white',
          }}
          handlePress={() => {
            DeviceEventEmitter.emit('SHOW_FILTER',{test:""});
          }}
        />
      )}

      <View style={Styles.header}>
        <Text style={Styles.headerText}>LöAdisyo</Text>
      </View>
    </View>
  );
};
