import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    
  },
  tabView: {
    backgroundColor: '#f5f5f5',
    height: Dimensions.get('window').height - 120,
  },
  circleButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor : colors.darkGren,
    borderRadius:30
  },
});
