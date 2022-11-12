import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.CardGreen,
    padding: 10,
    flexDirection: 'row',
  },
  userText:{
    paddingLeft: 10,
    flex:1
  },
  toolBoxContainer:{
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  listHeader:{
    backgroundColor:"white",flexDirection:"row",marginTop:10,padding:5, borderBottomWidth:1, borderBottomColor:"black"
  },
  listHeaderText:{
    color: colors.darkGren, letterSpacing: 1, fontSize: 20, flex: 1
  },
  formContainer:{
      
  }
});
