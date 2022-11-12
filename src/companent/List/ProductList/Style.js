import {StyleSheet,Dimensions} from "react-native"
import colors from "../../../styles/colors"

export default StyleSheet.create({

    container:{
        marginTop:10,
    },
    header:{
        backgroundColor:colors.white,
        paddingLeft:10,
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:"black",
        flexDirection:"row"
    },
    headerText:{
        color: "black",
        letterSpacing:1,
        fontSize:20,
        flex:1
    },
    ProductCard:{
        flexDirection:"row",
        backgroundColor:colors.CardGreen,
        padding:5,
        flex: 1, 
    },
    categoryTextContainer:{
        justifyContent:"center",
        flex:1
    },  
    CategoryText:{
        color: colors.CardTextGreen,
        fontSize:18,
        paddingLeft:10,
    },
    ProductDescText:{
        color:colors.CardTextGreen,
        fontSize:12,
        paddingLeft:10,
    },
    AmountText:{
        color:colors.CardTextGreen,
        fontSize:12,
        fontWeight:"bold",
        paddingLeft:10
    },
    toolboxContainer:{
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    categoryPicker:{
        flex:1
    },
    searchBox:{
        width:Dimensions.get("window").width / 2,
        maxHeight:30,
        padding:0,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderLeftWidth:1,
        borderColor:colors.lightGreen,
        paddingLeft:10,
        borderRadius:5
    },
    emptyCategoryContainer:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    emptyCategoryText:{
        color:colors.darkGren, 
        fontSize:18
    }
})