import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';

const Button = ({
  theme = 'primary',
  icon = null,
  text,
  sizeDiveder,
  styleContainer = null,
  handlePress,
  isLoading = -1,
}) => {
 
  const Loading = () => {
    return <ActivityIndicator color="white" />;
  };

  const ButtonText = () => {
    return (
      <>
        {icon && (
          <Icon
            name={icon.name}
            size={icon.size}
            color={icon.textColor}
            style={Styles[theme].icon}
          />
        )}
        <Text style={Styles[theme].text}>{text}</Text>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[Styles[theme].container(sizeDiveder, !!icon), styleContainer]}
      disabled={isLoading == 0}>
        {
          isLoading == 0 ? <Loading/> : <ButtonText />
        }

      </TouchableOpacity>
  );
};

export default Button;
