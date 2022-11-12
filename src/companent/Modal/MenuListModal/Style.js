import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height - 50,
  },
  toolboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuItemContainer: {
    padding: 5,
    marginTop: 5,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  menuItemCaption: {
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: 'red',
  },
  menuItembtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkGren,
  },
  menuItemQuantity: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.darkGren,
    borderWidth: 1,
  },
});
