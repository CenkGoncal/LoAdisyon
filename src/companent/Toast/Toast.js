import React, {useEffect, useState, useRef} from 'react';
import {View, Text, DeviceEventEmitter, Animated} from 'react-native';

const Message = props => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [refresh, setRefresh] = useState(false);

  const colors = {
    info: '#343a40',
    success: '#28a745',
    danger: '#dc3545',
  };
  useEffect(() => {


    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(()=>{ 
        props.onHide();     
        setRefresh(!refresh); 

        let FuncControl = props.hasOwnProperty("afterFunc") && typeof props.afterFunc == "function";
        if(FuncControl)
            props.afterFunc();
       }
    );
    return ()=>{ setRefresh(false);  }
  }, [refresh]);

  return (
    <Animated.View
      style={{
        backgroundColor: colors[props.messageType],
        zIndex: 1,
        elevation: 1,
        height: 25,
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}>
      <Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
        {props.message}
      </Text>
    </Animated.View>
  );
};

export default function Toast() {
  const [messages, setMessages] = useState([]);

  const onNewToast = data => {

    let arr = [...messages];
    arr.push({message:data.message, type:data.info});
    setMessages(arr);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('SHOW_TOAST', onNewToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  const onHide =(item) => {
      let items = messages.filter(f=>f.message != item.message);
      setMessages(items);
  }


  if (messages == null || messages.count >= 0) return null;


  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}>
      {messages.map(item =>  (  

        <Message
          key={item.message}
          message={item.message}
          messageType={item.type}
          onHide={() => onHide(item)}
        />
      ))}
    </View>
  );
}
