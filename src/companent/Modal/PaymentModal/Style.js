import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: 80
  },
  paymentStateBtn: {
    padding: 20,
    flexDirection: 'row'
  },
  paymentStateBtnText: {
    textAlign: 'center',
    paddingLeft:5,
    fontSize:20
  }});
