import React, {useState, useRef} from 'react';
import {View, Dimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {TextInput} from 'react-native-gesture-handler';
import colors from '../../../styles/colors';
import IconButton from '../IconButton';

const TextInputButton = ({handlePress, text, isEditable = false}) => {
  
  const formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes ;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
}

  const [Datetext, setDateText] = useState(...formatDate(text));

  return (
    <View style={{flexDirection: 'row',flex:1, backgroundColor:"#eceff1",borderColor:"gray",borderWidth:0.5, borderBottomRightRadius:5, borderTopRightRadius:5}}>
      <TextInput  value={formatDate(text)} style={{flex:1,color:"black",padding:0, marginLeft:5}}
                  editable={isEditable} onChange={setDateText} />
      <IconButton
        icon={{
          name: 'clock-o',
          size: 22,
          textColor: 'white',
        }}
        style={{padding:5, backgroundColor: colors.darkGren, borderRadius:5}}
        handlePress={handlePress}
      />
    </View>
  );
};

function DateInput({date, setDate}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{flexDirection: 'row',margin:3 }}>
      <TextInputButton text={date} handlePress={() => setOpen(true)} />
      <DatePicker
        modal
        locale='tr'
        open={open}
        date={date}
        mode={"datetime"}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        confirmText="Seç"
        cancelText="İptal"
        title="Tarih Seçimi"
      />
    </View>
  );
}

export default DateInput;
