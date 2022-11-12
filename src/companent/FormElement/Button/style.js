import {StyleSheet, Dimensions} from 'react-native';

const base_style = StyleSheet.create({
  container: (diveder, isIcon) => {

    var base_container = {
      padding: 10,
      borderRadius: 10,
      width: Dimensions.get('window').width / diveder - (diveder == 1 ? 20 : 6),
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (isIcon){ 
        base_container.flexDirection = 'row';
    }

    if(diveder == 1)
    {
      base_container.marginBottom = 5;
    }

    return {
      ...base_container,
    };
  },
  text: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: (diveder,isIcon) => {
      return {
        ...base_style.container(diveder,isIcon),
        backgroundColor: '#01a47d',
      };
    },
    text: {
      ...base_style.text,
      color: 'white',
    },
    icon: {
      ...base_style.icon,
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: (diveder,isIcon) => {
        return {
        ...base_style.container(diveder,isIcon),
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#01a47d',
      };
    },
    text: {
      ...base_style.text,
      color: '#01a47d',
    },
    icon: {
      ...base_style.icon,
    },
  }),
};
