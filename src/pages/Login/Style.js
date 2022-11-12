import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';


export default  StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#01a47d'
    },
    logoContainer:{
        backgroundColor: '#01a47d', 
        flex: 1
    },
    logo:{
        fontSize: 50, 
        color: 'white', 
        textAlign: 'center'
    },
    logoSubText:{
        textAlign: 'center',
         color: 'white'
    },
    loginFormContainer:{
        backgroundColor: 'white',
        flex: 3,
        borderTopStartRadius: 100,
        borderColor: 'white',
        paddingTop: 50,
    },
    lineContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10,
        marginTop:20,
    },
    buttonContainer:{
      marginTop:20,
      flexDirection: 'row', 
      justifyContent: 'space-evenly'  
    },
    lineCenterText:{
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
        color: '#01a47d',
    },
    OrderButonContainer:{
        marginTop:20,
        marginLeft:10        
    },
    personalContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    personelText:{
        marginTop: 2, 
        color: colors.darkGren
    },


 });