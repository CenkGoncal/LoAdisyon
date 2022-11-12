import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({

    row:{
        flexDirection:"row",
    },
    flex:{
        flex:1
    },
    searchBt:{
        width: 60,
        backgroundColor: colors.darkGren,
        margin: 5,
        alignItems: 'center',
    },
    error:{
        marginLeft:5,
        color: "red",
        textAlign:"left"
    }
});