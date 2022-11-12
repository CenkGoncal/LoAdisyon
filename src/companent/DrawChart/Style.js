import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

const screenWidth = Dimensions.get('window').width - 20;


export default StyleSheet.create({
    container:{
        flex: 1, 
        height: 1, 
        backgroundColor: 'black'
    },

    center:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    infoPanel:{
        backgroundColor: colors.darkGren,
        color: colors.white,
        width: screenWidth,
        textAlign: 'center',
    },
    center2:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    pullBottom:{
        position: 'absolute', bottom: 0
    },
    infoPanel2:{
        backgroundColor: colors.darkGren,
        color: colors.white,
        width: Dimensions.get('window').width,
        textAlign: 'center',
    },
    chartStyle:{
        width: screenWidth,
        height: 220,
        config:{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }
    },
});
