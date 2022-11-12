import {StyleSheet} from "react-native"
import colors from "../../../styles/colors"

export default StyleSheet.create({
    header:{
        backgroundColor:colors.darkGren,
        width:'100%',
        height:'100%',
        alignItems:"center",
        justifyContent:"flex-end",
        flexDirection:"row"
    },
    headerText:{
        color:"white",
        letterSpacing:1,
        fontSize:20
    }
})