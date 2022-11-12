import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import IconButton from '../IconButton';
import Styles from './style';

const InputText = ({
  text,
  icon = null,
  placeholder,
  isSecure = false,
  error = "",
  onChange,
  onBlur,
  isNumeric = false,
  isEditable = true
}) => {
  const [Secure, SetSecure] = useState(isSecure);

  const StringTextInput = () => {
    return(
      <TextInput
      secureTextEntry={Secure}
      style={Styles.text}
      value={text}
      placeholder={placeholder}
      onChangeText={onChange}
      onKeyPress={onBlur}
      editable={isEditable}
    />
    )
  }
  const NumericTextInput = () => {
    return(
      <TextInput
      secureTextEntry={Secure}
      style={Styles.text}
      value={text}
      placeholder={placeholder}
      onChangeText={(text)=>onChange(text.replace(/[^0-9]/g, ''))}
      onKeyPress={onBlur}
      keyboardType="numeric"
      />
    )
  }

  return (
    <>
      <View style={Styles.container}>
        {icon && (
          <Icon
            name={icon.name}
            style={Styles.icon}
            backgroundColor="#3b5998"
            size={icon.size}
          />
        )}
        { isNumeric ? NumericTextInput() : StringTextInput()
        }
        {isSecure && (
          <IconButton
            icon={{
              name: !Secure ? 'eye-slash' : 'eye',
              size: 20,
              color: 'white',
            }}
            style={Styles.iconButton}
            handlePress={() => SetSecure(!Secure)}
          />
        )}
      </View>
      {error != "" && (<Text style={Styles.error}>{error}</Text>)}
    </>
  );
};

export default InputText;
