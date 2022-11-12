import {StyleSheet,Dimensions} from "react-native"
import colors from "../../../styles/colors"

export default StyleSheet.create({

    container:{
        padding:10,
    },
   table:{
       height:150,
       flex:1,
       backgroundColor:colors.white,
       margin:5,
       borderRadius:10
   },
   tableFull:{
    height:150,
    flex:1,
    backgroundColor:colors.lightGreen,
    margin:5,
    borderRadius:10
    },
   tableName:{
       fontSize:15,
       color: colors.darkGren,
       textAlign:"center",
   },
   tablePrice:{
    fontSize:13,
    color:"#707070",
    paddingRight:5,
    position:"absolute",
    bottom:0,
    right:0
   }
})