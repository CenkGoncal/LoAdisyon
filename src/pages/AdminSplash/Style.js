import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.darkGren,
  },

  logo: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 45,
    textAlign: 'center',
  },
  logoSubText: {
    textAlign: 'center',
    color: 'white',
    margin: 20,
  },
  loading: {
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
});
