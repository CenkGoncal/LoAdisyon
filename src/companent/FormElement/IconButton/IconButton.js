import React from 'react';
import { TouchableOpacity,Text} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import Style from './Style';

const IconButton = ({icon = null,text ,style, handlePress, iconType = "IconFont"}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={[Style.container,style]}>
      {iconType == "IconFont" &&  
          <IconFont name={icon.name} size={icon.size} backgroundColor={icon.color} 
              color={icon.textColor} />
      }
      {iconType == "IconMaterial" &&  
          <IconMaterial name={icon.name} size={icon.size} backgroundColor={icon.color} 
              color={icon.textColor} />
     }
      {text && <Text style={[Style.text,text.style]}>{text.value}</Text>}
    </TouchableOpacity>
  );
};

export default IconButton;
