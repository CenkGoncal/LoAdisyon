import {StyleSheet, Dimensions} from "react-native";
import colors from "../../../styles/colors";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        padding:10,
        margin:10,
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        height: 150,
        justifyContent:"center",
        alignItems:"center",
        width : deviceSize.width / 2
    },
    toolboxContainer:{
        flexDirection:"row"
    }
})