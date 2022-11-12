import {DeviceEventEmitter} from "react-native";

const toast = {
  info: (options) => { DeviceEventEmitter.emit('SHOW_TOAST',{...options,info:'info'});  },
  success: (options) => { DeviceEventEmitter.emit('SHOW_TOAST',{...options,info:'success'}); },
  danger: (options) => { DeviceEventEmitter.emit('SHOW_TOAST',{...options,info:'danger'});},
};

export default toast;