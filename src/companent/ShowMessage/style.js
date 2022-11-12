import {StyleSheet,Dimensions} from 'react-native';

const base_style = StyleSheet.create({
    container :{
            position:"absolute",
            top:0,
            flex:1,
            height:25,
            width: Dimensions.get("window").width,
    },
    text:{
        fontSize:15,
        textAlign:"center",
        color:"white"
    }
});

export default  {

    success: StyleSheet.create({
        ...base_style,
        container: (fadeAnim) => {
            return {
            ...base_style.container,
            backgroundColor:"green",    
            opacity:fadeAnim
          };
        },
        text:{
            ...base_style.text
        }
    }),
    error:StyleSheet.create({
        ...base_style,
        container: (fadeAnim) => {
            return {
            ...base_style.container,
            backgroundColor:"red",
            opacity:fadeAnim
          }
        },
        text:{
            ...base_style.text
        }
    }),
};