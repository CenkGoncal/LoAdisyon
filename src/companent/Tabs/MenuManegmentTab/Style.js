import {StyleSheet,Dimensions} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({

    container:{
        //maxHeight:Dimensions.get("window").height -(115),
        justifyContent:"center"
    },
    tabItem:(isActive)=>{
        const base_style = {
            width: Dimensions.get("window").width / 2, 
            alignItems:"center",
            padding:10, 
            backgroundColor:"white",
            height:45,
            justifyContent:"center"
        };

        if(isActive)
        {
            base_style.borderBottomColor=colors.darkGren;
            base_style.borderBottomWidth=2;

        }

        return base_style;
    },
    tabItemText:{
        color:colors.darkGren,
        fontWeight:"300",
    }
})