import {StyleSheet, Dimensions} from "react-native";
import colors from "../../../styles/colors";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        padding:10,
        margin:10,
        marginBottom:10,
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        height: deviceSize.height / 2
    },
    toolboxContainer:{
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    }
})