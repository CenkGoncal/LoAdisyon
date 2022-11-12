import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    container:{
        margin:10,
        backgroundColor:"white",
        borderRadius:10,
        borderBottomWidth:1.1,
        borderBottomEndWidth:1,
        borderBottomLeftRadius:1,
        borderColor:"gray",
        flexDirection:"row",
        paddingLeft:10,
        
    },
    icon:{
        alignSelf:"center",
        marginRight:10,
    },
    text:{
        flex:1
    },
    iconButton:{
        alignSelf:"center",
        opacity:0.6,
    },
    error:{
        marginLeft:5,
        color: "red",
        textAlign:"left"
    }
});