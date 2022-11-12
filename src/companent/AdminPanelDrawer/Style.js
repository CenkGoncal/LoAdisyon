import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.lightGreen,
    marginBottom: 20,
    marginTop: -5,
  },
  userText: {
    color: colors.white,
  },
  circleUser: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#b6c2b7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutContainer: {
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  logoutButtonContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignContent:"center"
  },
  logOutButtonText: {
    marginLeft: 5,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#263238',
  },
});
