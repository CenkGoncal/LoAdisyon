import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  FooterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: colors.darkGren,
  },
  PaymentBtn: {
    position: 'absolute',
    bottom: 2,
    left: 20,
  },
  MenuBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.darkGren,
  },
  TotalPrice: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    color: colors.white,
  },
  OrderItemContainer: {
    margin: 10,
    backgroundColor: 'white',
  },
  OrderItemInfo: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  OrderInfoText: {
    flex: 1,
  },
  ProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"black"
  },
  Row: {
    flexDirection: 'row',
  },
  Caption: {
    fontWeight: 'bold',
    color:"black"
  },
  DeleteBtn: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DetailHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  DetailHeaderText:{
    color: colors.darkGren,
    flex: 1,
    fontSize: 15,
    paddingLeft: 5,
  },
  textColor:{
    color:"black"
  },
  orderCaption:{
    textAlign: 'center',
    backgroundColor: colors.darkGren,
    color: colors.white,
    fontSize: 15,
}
});
