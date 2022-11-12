import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';


export default StyleSheet.create({

    header:{
        backgroundColor: colors.darkGren,
        padding: 10,
        flexDirection: 'row',
       },
       headerTextView:{
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5,
        flex:1,
        
       },
       circleUser: {
          height: 25,
          width: 25,
          borderRadius: 15,
          backgroundColor: '#b6c2b7',
          justifyContent: 'center',
          alignItems: 'center',
        },
        circleExit: {
          height: 25,
          width: 25,
          borderRadius: 15,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }

});

